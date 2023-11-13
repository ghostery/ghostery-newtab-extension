import { build } from 'vite';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const WEB_EXT_TARGETS = {
  chrome: 'chromium',
  firefox: 'firefox-desktop',
  ghostery: 'firefox-desktop',
};

const watch = process.argv.includes('--watch');
const target = process.argv[watch ? 3 : 2] || 'firefox';

function WebExtPlugin() {
  let childProcess = null;

  return {
    name: 'web-ext-plugin',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      if (!childProcess) {
        console.log('Starting web-ext...');
        childProcess = spawn('npm', [
          'run',
          'web-ext',
          '--',
          `--target=${WEB_EXT_TARGETS[target]}`,
          target === 'ghostery'
            ? '--firefox="/Applications/Ghostery Private Browser.app/Contents/MacOS/Ghostery"'
            : '',
        ]);

        // pass data to console
        childProcess.stdout.on('data', function (data) {
          console.log(data.toString());
        });

        // log errors if any
        childProcess.stderr.on('data', function (data) {
          console.error(data.toString());
        });
      }
    },
  };
}

function ManifestPlugin() {
  return {
    name: 'manifest-plugin',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const manifest = JSON.parse(
        readFileSync(
          `./src/manifest.${WEB_EXT_TARGETS[target].split('-')[0]}.json`,
          {
            encoding: 'utf-8',
          },
        ),
      );

      const { version } = JSON.parse(
        readFileSync('./package.json', { encoding: 'utf-8' }),
      );

      manifest.version = version;

      writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2));
    },
  };
}

await build({
  logLevel: watch ? 'warn' : undefined,
  root: './src',
  resolve: {
    preserveSymlinks: true,
  },
  define: { __PLATFORM__: JSON.stringify(target) },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: '',
    minify: false,
    modulePreload: { polyfill: false },
    target: 'esnext',
    watch,
    rollupOptions: {
      preserveEntrySignatures: 'exports-only',
      output: {
        manualChunks: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
        minifyInternalExports: false,
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  plugins: [ManifestPlugin(), WebExtPlugin()],
});
