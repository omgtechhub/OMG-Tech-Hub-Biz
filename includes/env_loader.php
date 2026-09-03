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

// Automatically execute environment loader
omg_load_env();
