<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <header class="bg-[#102a63] text-white">
            <div class="max-w-6xl mx-auto px-5">
                <div class="flex justify-between items-center py-6">
                    <div class="text-5xl">GFZ Data Services Portal 1.5</div>
                    <a href="https://www.gfz.de/en/" class="block">
                        <img src="/images/portal/gfz-logo_en.svg" alt="GFZ logo" class="h-12" />
                    </a>
                </div>
            </div>

            <nav class="bg-[#ccddeb]">
                <div class="max-w-6xl mx-auto px-5 py-4">
                    <ul class="flex flex-wrap gap-x-12 text-gray-700">
                        <li class="flex items-center">
                            <img class="w-4 h-4 mr-1" src="/images/portal/home-icon.svg" />
                            <a href="/web" class="hover:text-orange-500">Home</a>
                        </li>
                        <li><a href="/web/find" class="hover:text-orange-500">Find</a></li>
                        <li><a href="/web/publish-data/publication-instructions" class="hover:text-orange-500">Publish Data</a></li>
                        <li><a href="/web/samples/introduction" class="hover:text-orange-500">Samples (IGSN)</a></li>
                        <li><a href="/web/support" class="hover:text-orange-500">Support</a></li>
                        <li><a href="/web/about-us" class="hover:text-orange-500">About Us</a></li>
                        <li class="text-sm pt-1">
                            <a href="/web/about-us/legal-notice" class="hover:text-orange-500">Legal Notice</a>
                        </li>
                        <li class="text-sm pt-1">
                            <a href="/web/about-us/data-protection" class="hover:text-orange-500">Data Protection</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="bg-[#e9e9e9] text-gray-800">
                <div class="max-w-6xl mx-auto px-5 py-6 pl-24 relative">
                    <img src="/images/portal/banner.png" class="absolute h-full top-0 -left-4" />
                    <span class="text-lg">
                        This is the data portal. More information on the
                        <a href="/web" class="text-[#00589c] hover:text-orange-500">GFZ Data Services homepage</a>.
                    </span>
                </div>
            </div>
        </header>

        @inertia

        <footer class="max-w-6xl mx-auto px-5 py-8 flex items-center justify-between">
            <a href="http://www.gfz.de/en" target="_blank" rel="noopener noreferrer" class="text-gray-500 text-xs">
                © GFZ Helmholtz-Centre - <strong>for Geosciences</strong>
            </a>

            <div class="flex items-center gap-8">
                <a href="http://www.helmholtz.de/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/portal/logo_helmholtz_gemeinschaft_de.gif" alt="Logo der Helmholtz-Gemeinschaft" class="h-[70px]" />
                </a>
                <a href="http://www.gfz.de/en/">
                    <img src="/images/portal/GFZ_Wortmarke_SVG_min2_en.svg" alt="Logo GFZ Potsdam" class="h-11" />
                </a>
            </div>
        </footer>
    </body>
</html>
