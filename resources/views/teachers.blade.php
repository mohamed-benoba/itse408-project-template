@extends('layout.app')

@section('body')
    <div class="flex flex-col lg:flex-row grow pt-(--header-height) lg:pt-0">
        <!-- Main -->
        <div
            class="flex flex-col grow items-stretch rounded-xl bg-background border border-input lg:ms-(--sidebar-width) mt-0 lg:mt-[15px] m-[15px]">
            <div class="flex flex-col grow kt-scrollable-y-auto [--kt-scrollbar-width:auto] pt-5" id="scrollable_content">
                <main class="grow" role="content">
                    <!-- Toolbar -->
                    <div class="pb-5">
                        <!-- Container -->
                        <div class="kt-container-fixed flex items-center justify-between flex-wrap gap-3">
                            <div class="flex items-center flex-wrap gap-1 lg:gap-5">
                                <h1 class="font-medium text-lg text-mono">
                                    المدرسين
                                </h1>
                            </div>
                            <div class="flex items-center flex-wrap gap-1.5 lg:gap-3.5">

                                <h2 class="font-small text-lg text-mono">
                                    السنة الدراسية: 2025 - 2026 شهر 6
                                </h2>
                            </div>
                        </div>
                        <!-- End of Container -->
                    </div>
                    <!-- End of Toolbar -->
                    <!-- Container -->
                    <div class="kt-container-fixed">

                    </div>
                    <!-- End of Container -->
                </main>
                <!-- Footer -->
                <footer class="footer">
                    <!-- Container -->
                    <div class="kt-container-fixed">
                        <div class="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
                            <div class="flex order-2 md:order-1 gap-2 font-normal text-sm">
                                <span class="text-muted-foreground">
                                    2025©
                                </span>
                                <a class="text-secondary-foreground hover:text-primary" href="https://keenthemes.com">
                                    Keenthemes Inc.
                                </a>
                            </div>
                            <nav class="flex order-1 md:order-2 gap-4 font-normal text-sm text-secondary-foreground">
                                <a class="hover:text-primary" href="https://keenthemes.com/metronic/tailwind/docs">
                                    Docs
                                </a>
                                <a class="hover:text-primary" href="https://1.envato.market/Vm7VRE">
                                    Purchase
                                </a>
                                <a class="hover:text-primary"
                                    href="https://keenthemes.com/metronic/tailwind/docs/getting-started/license">
                                    FAQ
                                </a>
                                <a class="hover:text-primary" href="https://devs.keenthemes.com">
                                    Support
                                </a>
                                <a class="hover:text-primary"
                                    href="https://keenthemes.com/metronic/tailwind/docs/getting-started/license">
                                    License
                                </a>
                            </nav>
                        </div>
                    </div>
                    <!-- End of Container -->
                </footer>
                <!-- End of Footer -->
           </div>
        </div>
        <!-- End of Main -->
    </div>
@endsection