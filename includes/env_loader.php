<?php
/**
 * Lightweight Environment Variable Loader for OMG Tech Hub
 */
if (!function_exists('omg_load_env')) {
    function omg_load_env(?string $path = null): void {
        if ($path === null) {
            $rootDir = dirname(__DIR__);
            $possiblePaths = [
                $rootDir . '/env/.env',
                $rootDir . '/.env',
            ];
            foreach ($possiblePaths as $p) {
                if (file_exists($p)) {
                    $path = $p;
                    break;
                }
            }
        }

        if (!$path || !file_exists($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0 || strpos($line, ';') === 0) {
                continue;
            }

            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);

                // Strip quotes if present
                if ((str_startswith($value, '"') && str_endswith($value, '"')) ||
                    (str_startswith($value, "'") && str_endswith($value, "'"))) {
                    $value = substr($value, 1, -1);
                }

                if (!array_key_exists($key, $_SERVER) && !array_key_exists($key, $_ENV)) {
                    putenv("{$key}={$value}");
                    $_ENV[$key] = $value;
                    $_SERVER[$key] = $value;
                }
            }
        }
    }
}

if (!function_exists('str_startswith')) {
    function str_startswith(string $haystack, string $needle): bool {
        return strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
if (!function_exists('str_endswith')) {
    function str_endswith(string $haystack, string $needle): bool {
        return $needle === '' || substr($haystack, -strlen($needle)) === $needle;
    }
}


if (!function_exists('omg_env')) {
    /**
     * Read a configuration value.
     *
     * getenv() alone is not enough: some shared hosts (InfinityFree among
     * them) disable putenv(), so nothing omg_load_env() sets is ever visible
     * to getenv(). The loader also writes $_ENV and $_SERVER directly, which
     * is unaffected, so fall back to those before giving up.
     */
    function omg_env(string $key, $default = null) {
        $v = getenv($key);
        if ($v !== false && $v !== '') return $v;
        if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
        if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') return $_SERVER[$key];
        return $default;
    }
}

// Automatically execute environment loader
omg_load_env();
