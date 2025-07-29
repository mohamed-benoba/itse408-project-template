<!-- Sidebar -->
<div class="fixed top-0 bottom-0 z-20 hidden lg:flex flex-col shrink-0 w-(--sidebar-width) bg-muted [--kt-drawer-enable:true] lg:[--kt-drawer-enable:false]"
    data-kt-drawer="true" data-kt-drawer-class="kt-drawer kt-drawer-start flex top-0 bottom-0" id="sidebar">
    <!-- Sidebar Header -->
    <div id="sidebar_header">
        <div class="flex items-center gap-2.5 px-3.5 h-[70px]">
            <a href="#">
                <img class="dark:hidden h-[42px] rounded-xl" src="assets\media\app\school-logo.png" />
                <img class="hidden dark:inline-block rounded-xl h-[42px]" src="assets\media\app\school-logo.png" />
            </a>
            <div class="kt-menu kt-menu-default grow" data-kt-menu="true">
                <div class="kt-menu-item grow" data-kt-menu-item-offset="0px,0px"
                    data-kt-menu-item-placement="bottom-start" data-kt-menu-item-toggle="dropdown"
                    data-kt-menu-item-trigger="hover">
                    <div class="kt-menu-label cursor-pointer text-mono font-medium grow justify-between">
                        <span class="text-base font-medium text-mono grow justify-center">
                            مشروع
                        </span>
                        <span class="kt-menu-arrow">
                            <i class="ki-filled ki-down">
                            </i>
                        </span>
                    </div>
                    <div class="kt-menu-dropdown w-48 py-2">
                        <div class="kt-menu-item">
                            <a class="kt-menu-link" href="html/demo6/public-profile/profiles/default.html" tabindex="0">
                                <span class="kt-menu-icon">
                                    <i class="ki-filled ki-profile-circle">
                                    </i>
                                </span>
                                <span class="kt-menu-title">
                                    إدارة الحساب
                                </span>
                            </a>
                        </div>
                        <div class="kt-menu-item">
                            <a class="kt-menu-link" href="html/demo6.html" tabindex="0">
                                <span class="kt-menu-icon">
                                    <i class="ki-filled ki-setting-2">
                                    </i>
                                </span>
                                <span class="kt-menu-title">
                                    الإعدادات
                                </span>
                            </a>
                        </div>
                     </div>
                </div>
            </div>
        </div>

    </div>
    <!-- End of Sidebar Header -->
    <!-- Sidebar menu -->
    <div class="kt-scrollable-y-auto grow" data-kt-scrollable="true" data-kt-scrollable-dependencies="#sidebar_header, #sidebar_footer" data-kt-scrollable-height="auto" data-kt-scrollable-offset="0px" data-kt-scrollable-wrappers="#sidebar_menu">

        <div class="kt-menu flex flex-col w-full gap-1.5 px-3.5" data-kt-menu="true"
            data-kt-menu-accordion-expand-all="false" id="sidebar_primary_menu">
            <div class="border-b border-input mt-2 mb-1 mx-1.5">
            </div>
            {{-- الصفحة الرئيسية --}}
            <div class="kt-menu-item">
                <a class="kt-menu-link gap-2.5 py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border"
                    href="/">
                    <span
                        class="kt-menu-icon items-start text-lg text-secondary-foreground kt-menu-item-active:text-foreground kt-menu-item-here:text-foreground kt-menu-item-show:text-foreground kt-menu-link-hover:text-foreground dark:menu-item-active:text-mono dark:menu-item-here:text-mono dark:menu-item-show:text-mono dark:menu-link-hover:text-mono">
                        <i class="fa-solid fa-house"></i>
                        </i>
                    </span>
                    <span
                        class="kt-menu-title text-sm text-foreground font-medium kt-menu-item-here:text-mono kt-menu-item-show:text-mono kt-menu-link-hover:text-mono">
                        الصفحة الرئيسية
                    </span>
                </a>
            </div>

            {{-- فاصل --}}
            <div class="border-b border-input mt-2 mb-1 mx-1.5">
            </div>

            {{-- التقارير --}}
            <div class="kt-menu-item kt-menu-item-accordion" data-kt-menu-item-toggle="accordion" data-kt-menu-item-trigger="click">
            <div class="kt-menu-link gap-2.5 py-2 px-2.5 rounded-md border border-transparent">
            <span class="kt-menu-icon items-start text-secondary-foreground text-lg kt-menu-item-here:text-foreground kt-menu-item-show:text-foreground kt-menu-link-hover:text-foreground dark:menu-item-here:text-mono dark:menu-item-show:text-mono dark:menu-link-hover:text-mono">
            <i class="ki-filled ki-profile-circle">
            </i>
            </span>
            <span class="kt-menu-title font-medium text-sm text-foreground kt-menu-item-here:text-mono kt-menu-item-show:text-mono kt-menu-link-hover:text-mono">
            التقارير
            </span>
            <span class="kt-menu-arrow text-muted-foreground kt-menu-item-here:text-foreground kt-menu-item-show:text-foreground kt-menu-link-hover:text-foreground">
            <span class="inline-flex kt-menu-item-show:hidden">
            <i class="ki-filled ki-down text-xs">
            </i>
            </span>
            <span class="hidden kt-menu-item-show:inline-flex">
            <i class="ki-filled ki-up text-xs">
            </i>
            </span>
            </span>
            </div>
            <div class="kt-menu-accordion gap-px ps-7 show" style="">
            
            {{-- التقارير السنوية --}}
            <div class="kt-menu-item">
            <a class="kt-menu-link py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border" href="html/demo6/public-profile/works.html">
            <span class="kt-menu-title text-sm text-foreground kt-menu-item-active:text-mono kt-menu-link-hover:text-mono">
                تقارير سنوية
            </span>
            </a>
            </div>

            {{-- التقارير الشهرية --}}
            <div class="kt-menu-item">
            <a class="kt-menu-link py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border" href="html/demo6/public-profile/teams.html">
            <span class="kt-menu-title text-sm text-foreground kt-menu-item-active:text-mono kt-menu-link-hover:text-mono">
                تقارير شهرية
            </span>
            </a>
            </div>

            {{-- التقارير الاسبوعية --}}
            <div class="kt-menu-item">
            <a class="kt-menu-link py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border" href="html/demo6/public-profile/network.html">
            <span class="kt-menu-title text-sm text-foreground kt-menu-item-active:text-mono kt-menu-link-hover:text-mono">
                تقارير اسبوعية
            </span>
            </a>
            </div>
            
            {{-- التقارير اليومية --}}
            <div class="kt-menu-item">
            <a class="kt-menu-link py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border" href="html/demo6/public-profile/activity.html">
            <span class="kt-menu-title text-sm text-foreground kt-menu-item-active:text-mono kt-menu-link-hover:text-mono">
                تقارير يومية
            </span>
            </a>
            </div>
            </div>
            </div>

            <div class="border-b border-input mt-2 mb-1 mx-1.5">
            </div>
        </div>
    </div>

    <!-- End of Sidebar kt-menu-->
    <!-- Footer -->

    <div class="flex flex-center justify-between shrink-0 ps-4 pe-3.5 mb-3.5" id="sidebar_footer">
        <!-- User -->
        <div data-kt-dropdown="true" data-kt-dropdown-offset="10px, 10px" data-kt-dropdown-offset-rtl="-20px, 10px"
            data-kt-dropdown-placement="bottom-start" data-kt-dropdown-placement-rtl="bottom-end"
            data-kt-dropdown-trigger="click" data-kt-dropdown-initialized="true">
            <div class="cursor-pointer shrink-0" data-kt-dropdown-toggle="true">
                <img alt="" class="size-9 rounded-full border-2 border-mono/25 shrink-0"
                    src="assets/media/avatars/gray/5.png">
            </div>
            <div class="kt-dropdown-menu w-[250px]" data-kt-dropdown-menu="true">
                <div class="flex items-center justify-between px-2.5 py-1.5 gap-1.5">
                    <div class="flex items-center gap-2">
                        <img alt="" class="size-9 shrink-0 rounded-full border-2 border-green-500"
                            src="assets/media/avatars/300-2.png">
                        <div class="flex flex-col gap-1.5">
                            <span class="text-sm text-foreground font-semibold leading-none">
                                {{ Auth::user()->name }}
                            </span>
                            <a class="text-xs text-secondary-foreground hover:text-primary font-medium leading-none"
                                href="html/demo6/account/home/get-started.html">
                                {{ Auth::user()->email }}
                            </a>
                        </div>
                    </div>
                </div>
                <ul class="kt-dropdown-menu-sub">
                    <li>
                        <div class="kt-dropdown-menu-separator">
                        </div>
                    </li>
                    <li>
                        <a class="kt-dropdown-menu-link" href="html/demo6/public-profile/profiles/default.html">
                            <i class="ki-filled ki-badge">
                            </i>
                            Public Profile
                        </a>
                    </li>
                    <li>
                        <a class="kt-dropdown-menu-link" href="html/demo6/account/home/user-profile.html">
                            <i class="ki-filled ki-profile-circle">
                            </i>
                            My Profile
                        </a>
                    </li>
                    <li data-kt-dropdown="true" data-kt-dropdown-placement="right-start"
                        data-kt-dropdown-trigger="hover" data-kt-dropdown-initialized="true">
                        <button class="kt-dropdown-menu-toggle" data-kt-dropdown-toggle="true">
                            <i class="ki-filled ki-setting-2">
                            </i>
                            My Account
                            <span class="kt-dropdown-menu-indicator">
                                <i class="ki-filled ki-right text-xs">
                                </i>
                            </span>
                        </button>
                        <div class="kt-dropdown-menu w-[220px]" data-kt-dropdown-menu="true">
                            <ul class="kt-dropdown-menu-sub">
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/home/get-started.html">
                                        <i class="ki-filled ki-coffee">
                                        </i>
                                        Get Started
                                    </a>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/home/user-profile.html">
                                        <i class="ki-filled ki-some-files">
                                        </i>
                                        My Profile
                                    </a>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="#">
                                        <span class="flex items-center gap-2">
                                            <i class="ki-filled ki-icon">
                                            </i>
                                            Billing
                                        </span>
                                        <span class="ms-auto inline-flex items-center" data-kt-tooltip="true"
                                            data-kt-tooltip-placement="top" data-kt-tooltip-initialized="true">
                                            <i class="ki-filled ki-information-2 text-base text-muted-foreground">
                                            </i>
                                            <span class="kt-tooltip" data-kt-tooltip-content="true">
                                                Payment and
                                                subscription info
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/security/overview.html">
                                        <i class="ki-filled ki-medal-star">
                                        </i>
                                        Security
                                    </a>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/members/teams.html">
                                        <i class="ki-filled ki-setting">
                                        </i>
                                        Members &amp; Roles
                                    </a>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/integrations.html">
                                        <i class="ki-filled ki-switch">
                                        </i>
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <div class="kt-dropdown-menu-separator">
                                    </div>
                                </li>
                                <li>
                                    <a class="kt-dropdown-menu-link" href="html/demo6/account/security/overview.html">
                                        <span class="flex items-center gap-2">
                                            <i class="ki-filled ki-shield-tick">
                                            </i>
                                            Notifications
                                        </span>
                                        <input checked="" class="ms-auto kt-switch" name="check" type="checkbox"
                                            value="1">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a class="kt-dropdown-menu-link" href="https://devs.keenthemes.com">
                            <i class="ki-filled ki-message-programming">
                            </i>
                            Dev Forum
                        </a>
                    </li>
                    <li data-kt-dropdown="true" data-kt-dropdown-placement="right-start"
                        data-kt-dropdown-trigger="hover" data-kt-dropdown-initialized="true">
                        <button class="kt-dropdown-menu-toggle py-1" data-kt-dropdown-toggle="true">
                            <span class="flex items-center gap-2">
                                <i class="ki-filled ki-icon">
                                </i>
                                Language
                            </span>
                            <span class="ms-auto kt-badge kt-badge-stroke shrink-0">
                                English
                                <img alt="" class="inline-block size-3.5 rounded-full"
                                    src="assets/media/flags/united-states.svg">
                            </span>
                        </button>
                        <div class="kt-dropdown-menu w-[180px]" data-kt-dropdown-menu="true">
                            <ul class="kt-dropdown-menu-sub">
                                <li class="active">
                                    <a class="kt-dropdown-menu-link" href="?dir=ltr">
                                        <span class="flex items-center gap-2">
                                            <img alt="" class="inline-block size-4 rounded-full"
                                                src="assets/media/flags/united-states.svg">
                                            <span class="kt-menu-title">
                                                English
                                            </span>
                                        </span>
                                        <i class="ki-solid ki-check-circle ms-auto text-green-500 text-base">
                                        </i>
                                    </a>
                                </li>
                                <li class="">
                                    <a class="kt-dropdown-menu-link" href="?dir=rtl">
                                        <span class="flex items-center gap-2">
                                            <img alt="" class="inline-block size-4 rounded-full"
                                                src="assets/media/flags/saudi-arabia.svg">
                                            <span class="kt-menu-title">
                                                Arabic(Saudi)
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li class="">
                                    <a class="kt-dropdown-menu-link" href="?dir=ltr">
                                        <span class="flex items-center gap-2">
                                            <img alt="" class="inline-block size-4 rounded-full"
                                                src="assets/media/flags/spain.svg">
                                            <span class="kt-menu-title">
                                                Spanish
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li class="">
                                    <a class="kt-dropdown-menu-link" href="?dir=ltr">
                                        <span class="flex items-center gap-2">
                                            <img alt="" class="inline-block size-4 rounded-full"
                                                src="assets/media/flags/germany.svg">
                                            <span class="kt-menu-title">
                                                German
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li class="">
                                    <a class="kt-dropdown-menu-link" href="?dir=ltr">
                                        <span class="flex items-center gap-2">
                                            <img alt="" class="inline-block size-4 rounded-full"
                                                src="assets/media/flags/japan.svg">
                                            <span class="kt-menu-title">
                                                Japanese
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="kt-dropdown-menu-separator">
                        </div>
                    </li>
                </ul>
                <div class="px-2.5 pt-1.5 mb-2.5 flex flex-col gap-3.5">
                    <div class="flex items-center gap-2 justify-between">
                        <span class="flex items-center gap-2">
                            <i class="ki-filled ki-moon text-base text-muted-foreground">
                            </i>
                            <span class="font-medium text-2sm">
                                Dark Mode
                            </span>
                        </span>
                        <input class="kt-switch" data-kt-theme-switch-state="dark" data-kt-theme-switch-toggle="true"
                            name="check" type="checkbox" value="1">
                    </div>
                    <form action="{{ route('signout') }}" method="post">
                    @csrf
                    <button class="kt-btn kt-btn-outline justify-center w-full" type="submit">
                        Log out
                    </button>
                    </form>

                </div>
            </div>
        </div>
        <!-- End of User -->
        <div class="flex items-center gap-1.5">
            <!-- Notifications -->
            <button class="kt-btn kt-btn-ghost kt-btn-icon size-8 hover:bg-background hover:[&amp;_i]:text-primary"
                data-kt-drawer-toggle="#notifications_drawer">
                <i class="ki-filled ki-notification-status text-lg">
                </i>
            </button>
            <!--Notifications Drawer-->

            <!--End of Notifications Drawer-->
            <!-- End of Notifications -->
            <a class="kt-btn kt-btn-ghost kt-btn-icon size-8 hover:bg-background hover:[&amp;_i]:text-primary"
                href="html/demo6/authentication/classic/sign-in.html">
                <i class="ki-filled ki-exit-right">
                </i>
            </a>
        </div>
    </div>
    <!-- End of Footer -->
</div>
<!-- End of Sidebar -->