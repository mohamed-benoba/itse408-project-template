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
                                    الصفحة الرئيسية
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
                        <!-- begin: grid -->
                        <div class="grid gap-5 lg:gap-7.5">
                            <!-- begin: grid -->
                            <div class="kt-card-content border-1 rounded-xl border-gray-100 dark:border-gray-300/50 ">
                                <div class="flex lg:px-10 py-1.5 gap-2 ">
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            624
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            الطلبة المسجلين
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            60
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            المدرسين
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            89%
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            نسبة الحضور
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            27
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            طلبات التسجيل
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                </div>
                            </div>
                            <!-- end: grid -->
                            <!-- begin: grid -->
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
                                <div class=" gap-5 lg:gap-7.5">
                                    <div class="col-span-1 lg:col-span-1 gap-3">
                                        <div class="kt-card">
                                            <div class="kt-card-header gap-2 ">
                                                <h3 class="kt-card-title">
                                                    المدرسين
                                                </h3>
                                                <div class="kt-menu" data-kt-menu="true">
                                                    <div class="kt-menu-item kt-menu-item-dropdown"
                                                        data-kt-menu-item-offset="0, 10px"
                                                        data-kt-menu-item-placement="bottom-end"
                                                        data-kt-menu-item-placement-rtl="bottom-start"
                                                        data-kt-menu-item-toggle="dropdown"
                                                        data-kt-menu-item-trigger="click">
                                                        <button
                                                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                            <i class="ki-filled ki-dots-vertical text-lg">
                                                            </i>
                                                        </button>
                                                        <div class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                                                            data-kt-menu-dismiss="true">
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    href="html/demo6/account/activity.html">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-cloud-change">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Activity
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    data-kt-modal-toggle="#share_profile_modal" href="#">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-share">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Share
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-item kt-menu-item-dropdown"
                                                                data-kt-menu-item-offset="-15px, 0"
                                                                data-kt-menu-item-placement="right-start"
                                                                data-kt-menu-item-toggle="dropdown"
                                                                data-kt-menu-item-trigger="click|lg:hover">
                                                                <div class="kt-menu-link">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-notification-status">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Notifications
                                                                    </span>
                                                                    <span class="kt-menu-arrow">
                                                                        <i
                                                                            class="ki-filled ki-right text-xs rtl:transform rtl:rotate-180">
                                                                        </i>
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]">
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            href="html/demo6/account/home/settings-sidebar.html">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-sms">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Email
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            href="html/demo6/account/home/settings-sidebar.html">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-message-notify">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                SMS
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            href="html/demo6/account/home/settings-sidebar.html">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-notification-status">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Push
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    data-kt-modal-toggle="#report_user_modal" href="#">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-dislike">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Report
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-separator">
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    href="html/demo6/account/home/settings-enterprise.html">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-setting-3">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Settings
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="kt-card-content">
                                                <div class="flex flex-col gap-2 lg:gap-5">
                                                    <div class="flex items-center gap-2">
                                                        <div class="flex items-center grow gap-2.5">
                                                            <img alt="" class="rounded-full size-9 shrink-0"
                                                                src="assets/media/avatars/300-3.png">
                                                            <div class="flex flex-col">
                                                                <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                    href="#">
                                                                    محمد حمودة
                                                                </a>
                                                                <span
                                                                    class="text-xs font-semibold text-secondary-foreground">
                                                                    صف اول, صف السابع
                                                                </span>
                                                            </div>

                                                        </div>
                                                        <div class="kt-menu" data-kt-menu="true">
                                                            <div class="kt-menu-item kt-menu-item-dropdown"
                                                                data-kt-menu-item-offset="0, 10px"
                                                                data-kt-menu-item-placement="bottom-end"
                                                                data-kt-menu-item-placement-rtl="bottom-start"
                                                                data-kt-menu-item-toggle="dropdown"
                                                                data-kt-menu-item-trigger="click">
                                                                <button
                                                                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                                    <i class="ki-filled ki-dots-vertical text-lg">
                                                                    </i>
                                                                </button>
                                                                <div class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                                                                    data-kt-menu-dismiss="true">
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-document">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Details
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            data-kt-modal-toggle="#share_profile_modal"
                                                                            href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-share">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Share
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-file-up">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Export
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <div class="flex items-center grow gap-2.5">
                                                            <img alt="" class="rounded-full size-9 shrink-0"
                                                                src="assets/media/avatars/300-1.png">
                                                            <div class="flex flex-col">
                                                                <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                    href="#">
                                                                    سالمة ابوراس
                                                                </a>
                                                                <span
                                                                    class="text-xs font-semibold text-secondary-foreground">
                                                                    صف خامس دين ,صف رابع دين
                                                                </span>
                                                            </div>

                                                        </div>
                                                        <div class="kt-menu" data-kt-menu="true">
                                                            <div class="kt-menu-item kt-menu-item-dropdown"
                                                                data-kt-menu-item-offset="0, 10px"
                                                                data-kt-menu-item-placement="bottom-end"
                                                                data-kt-menu-item-placement-rtl="bottom-start"
                                                                data-kt-menu-item-toggle="dropdown"
                                                                data-kt-menu-item-trigger="click">
                                                                <button
                                                                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                                    <i class="ki-filled ki-dots-vertical text-lg">
                                                                    </i>
                                                                </button>
                                                                <div class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                                                                    data-kt-menu-dismiss="true">
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-document">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Details
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            data-kt-modal-toggle="#share_profile_modal"
                                                                            href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-share">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Share
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-file-up">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Export
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <div class="flex items-center grow gap-2.5">
                                                            <img alt="" class="rounded-full size-9 shrink-0"
                                                                src="assets/media/avatars/300-14.png">
                                                            <div class="flex flex-col">
                                                                <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                    href="#">
                                                                    امنة المسعودي
                                                                </a>
                                                                <span
                                                                    class="text-xs font-semibold text-secondary-foreground">
                                                                   صف الثامن عربي
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="kt-menu" data-kt-menu="true">
                                                            <div class="kt-menu-item kt-menu-item-dropdown"
                                                                data-kt-menu-item-offset="0, 10px"
                                                                data-kt-menu-item-placement="bottom-end"
                                                                data-kt-menu-item-placement-rtl="bottom-start"
                                                                data-kt-menu-item-toggle="dropdown"
                                                                data-kt-menu-item-trigger="click">
                                                                <button
                                                                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                                    <i class="ki-filled ki-dots-vertical text-lg">
                                                                    </i>
                                                                </button>
                                                                <div class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                                                                    data-kt-menu-dismiss="true">
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-document">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Details
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            data-kt-modal-toggle="#share_profile_modal"
                                                                            href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-share">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Share
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-file-up">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Export
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <div class="flex items-center grow gap-2.5">
                                                            <img alt="" class="rounded-full size-9 shrink-0"
                                                                src="assets/media/avatars/300-7.png">
                                                            <div class="flex flex-col">
                                                                <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                    href="#">
                                                                    سليمة الجدي
                                                                </a>
                                                                <span
                                                                    class="text-xs font-semibold text-secondary-foreground">
                                                                    ربة منزل 
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="kt-menu" data-kt-menu="true">
                                                            <div class="kt-menu-item kt-menu-item-dropdown"
                                                                data-kt-menu-item-offset="0, 10px"
                                                                data-kt-menu-item-placement="bottom-end"
                                                                data-kt-menu-item-placement-rtl="bottom-start"
                                                                data-kt-menu-item-toggle="dropdown"
                                                                data-kt-menu-item-trigger="click">
                                                                <button
                                                                    class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                                    <i class="ki-filled ki-dots-vertical text-lg">
                                                                    </i>
                                                                </button>
                                                                <div class="kt-menu-dropdown kt-menu-default w-full max-w-[175px]"
                                                                    data-kt-menu-dismiss="true">
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-document">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Details
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link"
                                                                            data-kt-modal-toggle="#share_profile_modal"
                                                                            href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-share">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Share
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="kt-menu-item">
                                                                        <a class="kt-menu-link" href="#">
                                                                            <span class="kt-menu-icon">
                                                                                <i class="ki-filled ki-file-up">
                                                                                </i>
                                                                            </span>
                                                                            <span class="kt-menu-title">
                                                                                Export
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="kt-card-footer justify-center">
                                                <a class="kt-link kt-link-underlined kt-link-dashed"
                                                    href="html/demo6/public-profile/network.html">
                                                    All Contributors
                                                </a>
                                            </div>
                                        </div>
                                        <div class="kt-card">
                                            <div class="kt-card-header">
                                                <h3 class="kt-card-title">
                                                    Assistance
                                                </h3>
                                                <div class="kt-menu" data-kt-menu="true">
                                                    <div class="kt-menu-item kt-menu-item-dropdown"
                                                        data-kt-menu-item-offset="0, 10px"
                                                        data-kt-menu-item-placement="bottom-end"
                                                        data-kt-menu-item-placement-rtl="bottom-start"
                                                        data-kt-menu-item-toggle="dropdown"
                                                        data-kt-menu-item-trigger="click">
                                                        <button
                                                            class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                                                            <i class="ki-filled ki-dots-vertical text-lg">
                                                            </i>
                                                        </button>
                                                        <div class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]"
                                                            data-kt-menu-dismiss="true">
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    href="html/demo6/account/home/settings-enterprise.html">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-setting-3">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Settings
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    href="html/demo6/account/members/import-members.html">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-some-files">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Import
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    href="html/demo6/account/activity.html">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-cloud-change">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Activity
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <div class="kt-menu-item">
                                                                <a class="kt-menu-link"
                                                                    data-kt-modal-toggle="#report_user_modal" href="#">
                                                                    <span class="kt-menu-icon">
                                                                        <i class="ki-filled ki-dislike">
                                                                        </i>
                                                                    </span>
                                                                    <span class="kt-menu-title">
                                                                        Report
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="kt-card-content flex justify-center items-center px-3 py-1">
                                                <div id="contributions_chart" class="" style="min-height: 197px;">
                                                    <div id="apexchartsciquzq6e"
                                                        class="apexcharts-canvas apexchartsciquzq6e apexcharts-theme-light"
                                                        style="width: 300px; height: 197px;"><svg
                                                            xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            class="apexcharts-svg" xmlns:data="ApexChartsNS"
                                                            transform="translate(0, 0)" width="300" height="197">
                                                            <foreignObject x="0" y="0" width="300" height="197">
                                                                <style type="text/css">
                                                                    .apexcharts-flip-y {
                                                                        transform: scaleY(-1) translateY(-100%);
                                                                        transform-origin: top;
                                                                        transform-box: fill-box;
                                                                    }

                                                                    .apexcharts-flip-x {
                                                                        transform: scaleX(-1);
                                                                        transform-origin: center;
                                                                        transform-box: fill-box;
                                                                    }

                                                                    .apexcharts-legend {
                                                                        display: flex;
                                                                        overflow: auto;
                                                                        padding: 0 10px;
                                                                    }

                                                                    .apexcharts-legend.apexcharts-legend-group-horizontal {
                                                                        flex-direction: column;
                                                                    }

                                                                    .apexcharts-legend-group {
                                                                        display: flex;
                                                                    }

                                                                    .apexcharts-legend-group-vertical {
                                                                        flex-direction: column-reverse;
                                                                    }

                                                                    .apexcharts-legend.apx-legend-position-bottom,
                                                                    .apexcharts-legend.apx-legend-position-top {
                                                                        flex-wrap: wrap
                                                                    }

                                                                    .apexcharts-legend.apx-legend-position-right,
                                                                    .apexcharts-legend.apx-legend-position-left {
                                                                        flex-direction: column;
                                                                        bottom: 0;
                                                                    }

                                                                    .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left,
                                                                    .apexcharts-legend.apx-legend-position-top.apexcharts-align-left,
                                                                    .apexcharts-legend.apx-legend-position-right,
                                                                    .apexcharts-legend.apx-legend-position-left {
                                                                        justify-content: flex-start;
                                                                        align-items: flex-start;
                                                                    }

                                                                    .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center,
                                                                    .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {
                                                                        justify-content: center;
                                                                        align-items: center;
                                                                    }

                                                                    .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right,
                                                                    .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {
                                                                        justify-content: flex-end;
                                                                        align-items: flex-end;
                                                                    }

                                                                    .apexcharts-legend-series {
                                                                        cursor: pointer;
                                                                        line-height: normal;
                                                                        display: flex;
                                                                        align-items: center;
                                                                    }

                                                                    .apexcharts-legend-text {
                                                                        position: relative;
                                                                        font-size: 14px;
                                                                    }

                                                                    .apexcharts-legend-text *,
                                                                    .apexcharts-legend-marker * {
                                                                        pointer-events: none;
                                                                    }

                                                                    .apexcharts-legend-marker {
                                                                        position: relative;
                                                                        display: flex;
                                                                        align-items: center;
                                                                        justify-content: center;
                                                                        cursor: pointer;
                                                                        margin-right: 1px;
                                                                    }

                                                                    .apexcharts-legend-series.apexcharts-no-click {
                                                                        cursor: auto;
                                                                    }

                                                                    .apexcharts-legend .apexcharts-hidden-zero-series,
                                                                    .apexcharts-legend .apexcharts-hidden-null-series {
                                                                        display: none !important;
                                                                    }

                                                                    .apexcharts-inactive-legend {
                                                                        opacity: 0.45;
                                                                    }
                                                                </style>
                                                            </foreignObject>
                                                            <g class="apexcharts-inner apexcharts-graphical"
                                                                transform="translate(10, 0)">
                                                                <defs>
                                                                    <clipPath id="gridRectMaskciquzq6e">
                                                                        <rect width="200" height="200" x="-3" y="-3" rx="0"
                                                                            ry="0" opacity="1" stroke-width="0"
                                                                            stroke="none" stroke-dasharray="0" fill="#fff">
                                                                        </rect>
                                                                    </clipPath>
                                                                    <clipPath id="gridRectBarMaskciquzq6e">
                                                                        <rect width="200" height="200" x="-3" y="-3" rx="0"
                                                                            ry="0" opacity="1" stroke-width="0"
                                                                            stroke="none" stroke-dasharray="0" fill="#fff">
                                                                        </rect>
                                                                    </clipPath>
                                                                    <clipPath id="gridRectMarkerMaskciquzq6e">
                                                                        <rect width="194" height="194" x="0" y="0" rx="0"
                                                                            ry="0" opacity="1" stroke-width="0"
                                                                            stroke="none" stroke-dasharray="0" fill="#fff">
                                                                        </rect>
                                                                    </clipPath>
                                                                    <clipPath id="forecastMaskciquzq6e"></clipPath>
                                                                    <clipPath id="nonForecastMaskciquzq6e"></clipPath>
                                                                </defs>
                                                                <g class="apexcharts-pie">
                                                                    <g transform="translate(0, 0) scale(1)">
                                                                        <circle r="57.612195121951224" cx="97" cy="97"
                                                                            fill="transparent"></circle>
                                                                        <g class="apexcharts-slices">
                                                                            <g class="apexcharts-series apexcharts-pie-series"
                                                                                seriesName="ERP" rel="1" data:realIndex="0">
                                                                                <path
                                                                                    d="M 97 8.36585365853658 A 88.63414634146342 88.63414634146342 0 0 1 185.57501392627927 100.23709833637882 L 154.57375905208153 99.10411391864623 A 57.612195121951224 57.612195121951224 0 0 0 97 39.387804878048776 L 97 8.36585365853658 z "
                                                                                    fill="var(--color-primary)"
                                                                                    fill-opacity="1"
                                                                                    stroke="var(--color-border)"
                                                                                    stroke-opacity="1" stroke-linecap="butt"
                                                                                    stroke-width="2" stroke-dasharray="0"
                                                                                    class="apexcharts-pie-area apexcharts-donut-slice-0"
                                                                                    index="0" j="0"
                                                                                    data:angle="92.09302325581395"
                                                                                    data:startAngle="0" data:strokeWidth="2"
                                                                                    data:value="44"
                                                                                    data:pathOrig="M 97 8.36585365853658 A 88.63414634146342 88.63414634146342 0 0 1 185.57501392627927 100.23709833637882 L 154.57375905208153 99.10411391864623 A 57.612195121951224 57.612195121951224 0 0 0 97 39.387804878048776 L 97 8.36585365853658 z ">
                                                                                </path>
                                                                            </g>
                                                                            <g class="apexcharts-series apexcharts-pie-series"
                                                                                seriesName="HRM" rel="2" data:realIndex="1">
                                                                                <path
                                                                                    d="M 185.57501392627927 100.23709833637882 A 88.63414634146342 88.63414634146342 0 0 1 56.47271700270594 175.82608217168473 L 70.65726605175887 148.23695341159507 A 57.612195121951224 57.612195121951224 0 0 0 154.57375905208153 99.10411391864623 L 185.57501392627927 100.23709833637882 z "
                                                                                    fill="var(--color-destructive)"
                                                                                    fill-opacity="1"
                                                                                    stroke="var(--color-border)"
                                                                                    stroke-opacity="1" stroke-linecap="butt"
                                                                                    stroke-width="2" stroke-dasharray="0"
                                                                                    class="apexcharts-pie-area apexcharts-donut-slice-1"
                                                                                    index="0" j="1"
                                                                                    data:angle="115.11627906976746"
                                                                                    data:startAngle="92.09302325581395"
                                                                                    data:strokeWidth="2" data:value="55"
                                                                                    data:pathOrig="M 185.57501392627927 100.23709833637882 A 88.63414634146342 88.63414634146342 0 0 1 56.47271700270594 175.82608217168473 L 70.65726605175887 148.23695341159507 A 57.612195121951224 57.612195121951224 0 0 0 154.57375905208153 99.10411391864623 L 185.57501392627927 100.23709833637882 z ">
                                                                                </path>
                                                                            </g>
                                                                            <g class="apexcharts-series apexcharts-pie-series"
                                                                                seriesName="DMS" rel="3" data:realIndex="2">
                                                                                <path
                                                                                    d="M 56.47271700270594 175.82608217168473 A 88.63414634146342 88.63414634146342 0 0 1 15.425901680723769 62.33476696923836 L 43.97683609247045 74.46759853000493 A 57.612195121951224 57.612195121951224 0 0 0 70.65726605175887 148.23695341159507 L 56.47271700270594 175.82608217168473 z "
                                                                                    fill="var(--color-green-500)"
                                                                                    fill-opacity="1"
                                                                                    stroke="var(--color-border)"
                                                                                    stroke-opacity="1" stroke-linecap="butt"
                                                                                    stroke-width="2" stroke-dasharray="0"
                                                                                    class="apexcharts-pie-area apexcharts-donut-slice-2"
                                                                                    index="0" j="2"
                                                                                    data:angle="85.81395348837208"
                                                                                    data:startAngle="207.2093023255814"
                                                                                    data:strokeWidth="2" data:value="41"
                                                                                    data:pathOrig="M 56.47271700270594 175.82608217168473 A 88.63414634146342 88.63414634146342 0 0 1 15.425901680723769 62.33476696923836 L 43.97683609247045 74.46759853000493 A 57.612195121951224 57.612195121951224 0 0 0 70.65726605175887 148.23695341159507 L 56.47271700270594 175.82608217168473 z ">
                                                                                </path>
                                                                            </g>
                                                                            <g class="apexcharts-series apexcharts-pie-series"
                                                                                seriesName="CRM" rel="4" data:realIndex="3">
                                                                                <path
                                                                                    d="M 15.425901680723769 62.33476696923836 A 88.63414634146342 88.63414634146342 0 0 1 50.82689762602096 21.34250523020205 L 66.98748345691362 47.822628399631334 A 57.612195121951224 57.612195121951224 0 0 0 43.97683609247045 74.46759853000493 L 15.425901680723769 62.33476696923836 z "
                                                                                    fill="var(--color-violet-500)"
                                                                                    fill-opacity="1"
                                                                                    stroke="var(--color-border)"
                                                                                    stroke-opacity="1" stroke-linecap="butt"
                                                                                    stroke-width="2" stroke-dasharray="0"
                                                                                    class="apexcharts-pie-area apexcharts-donut-slice-3"
                                                                                    index="0" j="3"
                                                                                    data:angle="35.58139534883719"
                                                                                    data:startAngle="293.0232558139535"
                                                                                    data:strokeWidth="2" data:value="17"
                                                                                    data:pathOrig="M 15.425901680723769 62.33476696923836 A 88.63414634146342 88.63414634146342 0 0 1 50.82689762602096 21.34250523020205 L 66.98748345691362 47.822628399631334 A 57.612195121951224 57.612195121951224 0 0 0 43.97683609247045 74.46759853000493 L 15.425901680723769 62.33476696923836 z ">
                                                                                </path>
                                                                            </g>
                                                                            <g class="apexcharts-series apexcharts-pie-series"
                                                                                seriesName="DAM" rel="5" data:realIndex="4">
                                                                                <path
                                                                                    d="M 50.82689762602096 21.34250523020205 A 88.63414634146342 88.63414634146342 0 0 1 96.98453042324499 8.365855008511815 L 96.98994477510925 39.38780575553268 A 57.612195121951224 57.612195121951224 0 0 0 66.98748345691362 47.822628399631334 L 50.82689762602096 21.34250523020205 z "
                                                                                    fill="var(--color-yellow-500)"
                                                                                    fill-opacity="1"
                                                                                    stroke="var(--color-border)"
                                                                                    stroke-opacity="1" stroke-linecap="butt"
                                                                                    stroke-width="2" stroke-dasharray="0"
                                                                                    class="apexcharts-pie-area apexcharts-donut-slice-4"
                                                                                    index="0" j="4"
                                                                                    data:angle="31.395348837209326"
                                                                                    data:startAngle="328.6046511627907"
                                                                                    data:strokeWidth="2" data:value="15"
                                                                                    data:pathOrig="M 50.82689762602096 21.34250523020205 A 88.63414634146342 88.63414634146342 0 0 1 96.98453042324499 8.365855008511815 L 96.98994477510925 39.38780575553268 A 57.612195121951224 57.612195121951224 0 0 0 66.98748345691362 47.822628399631334 L 50.82689762602096 21.34250523020205 z ">
                                                                                </path>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <line x1="0" y1="0" x2="194" y2="0" stroke="#b6b6b6"
                                                                    stroke-dasharray="0" stroke-width="1"
                                                                    stroke-linecap="butt" class="apexcharts-ycrosshairs">
                                                                </line>
                                                                <line x1="0" y1="0" x2="194" y2="0" stroke="#b6b6b6"
                                                                    stroke-dasharray="0" stroke-width="0"
                                                                    stroke-linecap="butt"
                                                                    class="apexcharts-ycrosshairs-hidden"></line>
                                                            </g>
                                                            <g class="apexcharts-datalabels-group"
                                                                transform="translate(0, 0) scale(1)"></g>
                                                            <g class="apexcharts-datalabels-group"
                                                                transform="translate(0, 0) scale(1)"></g>
                                                        </svg>
                                                        <div class="apexcharts-legend apexcharts-align-center apx-legend-position-right"
                                                            style="position: absolute; left: auto; top: 10px; right: 15px;">
                                                            <div class="apexcharts-legend-series" rel="1" seriesname="ERP"
                                                                data:collapsed="false" style="margin: 1px 5px;"><span
                                                                    class="apexcharts-legend-marker" rel="1"
                                                                    data:collapsed="false"
                                                                    style="height: 16px; width: 16px; left: 0px; top: 0px;"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        width="100%" height="100%">
                                                                        <path d="M 0, 0 
                                                                                m -7, 0 
                                                                                a 7,7 0 1,0 14,0 
                                                                                a 7,7 0 1,0 -14,0"
                                                                            fill="var(--color-primary)" fill-opacity="1"
                                                                            stroke="#ffffff" stroke-opacity="0.9"
                                                                            stroke-linecap="butt" stroke-width="1"
                                                                            stroke-dasharray="0" cx="0" cy="0"
                                                                            shape="circle"
                                                                            class="apexcharts-legend-marker apexcharts-marker apexcharts-marker-circle"
                                                                            style="transform: translate(50%, 50%);"></path>
                                                                    </svg></span><span class="apexcharts-legend-text"
                                                                    rel="1" i="0" data:default-text="ERP"
                                                                    data:collapsed="false"
                                                                    style="color: var(--color-secondary-foreground); font-size: 13px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">ERP</span>
                                                            </div>
                                                            <div class="apexcharts-legend-series" rel="2" seriesname="HRM"
                                                                data:collapsed="false" style="margin: 1px 5px;"><span
                                                                    class="apexcharts-legend-marker" rel="2"
                                                                    data:collapsed="false"
                                                                    style="height: 16px; width: 16px; left: 0px; top: 0px;"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        width="100%" height="100%">
                                                                        <path d="M 0, 0 
                                                                                m -7, 0 
                                                                                a 7,7 0 1,0 14,0 
                                                                                a 7,7 0 1,0 -14,0"
                                                                            fill="var(--color-destructive)" fill-opacity="1"
                                                                            stroke="#ffffff" stroke-opacity="0.9"
                                                                            stroke-linecap="butt" stroke-width="1"
                                                                            stroke-dasharray="0" cx="0" cy="0"
                                                                            shape="circle"
                                                                            class="apexcharts-legend-marker apexcharts-marker apexcharts-marker-circle"
                                                                            style="transform: translate(50%, 50%);"></path>
                                                                    </svg></span><span class="apexcharts-legend-text"
                                                                    rel="2" i="1" data:default-text="HRM"
                                                                    data:collapsed="false"
                                                                    style="color: var(--color-secondary-foreground); font-size: 13px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">HRM</span>
                                                            </div>
                                                            <div class="apexcharts-legend-series" rel="3" seriesname="DMS"
                                                                data:collapsed="false" style="margin: 1px 5px;"><span
                                                                    class="apexcharts-legend-marker" rel="3"
                                                                    data:collapsed="false"
                                                                    style="height: 16px; width: 16px; left: 0px; top: 0px;"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        width="100%" height="100%">
                                                                        <path d="M 0, 0 
                                                                                m -7, 0 
                                                                                a 7,7 0 1,0 14,0 
                                                                                a 7,7 0 1,0 -14,0"
                                                                            fill="var(--color-green-500)" fill-opacity="1"
                                                                            stroke="#ffffff" stroke-opacity="0.9"
                                                                            stroke-linecap="butt" stroke-width="1"
                                                                            stroke-dasharray="0" cx="0" cy="0"
                                                                            shape="circle"
                                                                            class="apexcharts-legend-marker apexcharts-marker apexcharts-marker-circle"
                                                                            style="transform: translate(50%, 50%);"></path>
                                                                    </svg></span><span class="apexcharts-legend-text"
                                                                    rel="3" i="2" data:default-text="DMS"
                                                                    data:collapsed="false"
                                                                    style="color: var(--color-secondary-foreground); font-size: 13px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">DMS</span>
                                                            </div>
                                                            <div class="apexcharts-legend-series" rel="4" seriesname="CRM"
                                                                data:collapsed="false" style="margin: 1px 5px;"><span
                                                                    class="apexcharts-legend-marker" rel="4"
                                                                    data:collapsed="false"
                                                                    style="height: 16px; width: 16px; left: 0px; top: 0px;"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        width="100%" height="100%">
                                                                        <path d="M 0, 0 
                            m -7, 0 
                            a 7,7 0 1,0 14,0 
                            a 7,7 0 1,0 -14,0" fill="var(--color-violet-500)" fill-opacity="1" stroke="#ffffff"
                                                                            stroke-opacity="0.9" stroke-linecap="butt"
                                                                            stroke-width="1" stroke-dasharray="0" cx="0"
                                                                            cy="0" shape="circle"
                                                                            class="apexcharts-legend-marker apexcharts-marker apexcharts-marker-circle"
                                                                            style="transform: translate(50%, 50%);"></path>
                                                                    </svg></span><span class="apexcharts-legend-text"
                                                                    rel="4" i="3" data:default-text="CRM"
                                                                    data:collapsed="false"
                                                                    style="color: var(--color-secondary-foreground); font-size: 13px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">CRM</span>
                                                            </div>
                                                            <div class="apexcharts-legend-series" rel="5" seriesname="DAM"
                                                                data:collapsed="false" style="margin: 1px 5px;"><span
                                                                    class="apexcharts-legend-marker" rel="5"
                                                                    data:collapsed="false"
                                                                    style="height: 16px; width: 16px; left: 0px; top: 0px;"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        width="100%" height="100%">
                                                                        <path d="M 0, 0 
                            m -7, 0 
                            a 7,7 0 1,0 14,0 
                            a 7,7 0 1,0 -14,0" fill="var(--color-yellow-500)" fill-opacity="1" stroke="#ffffff"
                                                                            stroke-opacity="0.9" stroke-linecap="butt"
                                                                            stroke-width="1" stroke-dasharray="0" cx="0"
                                                                            cy="0" shape="circle"
                                                                            class="apexcharts-legend-marker apexcharts-marker apexcharts-marker-circle"
                                                                            style="transform: translate(50%, 50%);"></path>
                                                                    </svg></span><span class="apexcharts-legend-text"
                                                                    rel="5" i="4" data:default-text="DAM"
                                                                    data:collapsed="false"
                                                                    style="color: var(--color-secondary-foreground); font-size: 13px; font-weight: 500; font-family: Helvetica, Arial, sans-serif;">DAM</span>
                                                            </div>
                                                        </div>
                                                        <div class="apexcharts-tooltip apexcharts-theme-dark">
                                                            <div class="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0"
                                                                style="order: 1;"><span class="apexcharts-tooltip-marker"
                                                                    shape="circle"
                                                                    style="background-color: var(--color-primary);"></span>
                                                                <div class="apexcharts-tooltip-text"
                                                                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                                    <div class="apexcharts-tooltip-y-group"><span
                                                                            class="apexcharts-tooltip-text-y-label"></span><span
                                                                            class="apexcharts-tooltip-text-y-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-goals-group"><span
                                                                            class="apexcharts-tooltip-text-goals-label"></span><span
                                                                            class="apexcharts-tooltip-text-goals-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-z-group"><span
                                                                            class="apexcharts-tooltip-text-z-label"></span><span
                                                                            class="apexcharts-tooltip-text-z-value"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-1"
                                                                style="order: 2;"><span class="apexcharts-tooltip-marker"
                                                                    shape="circle"
                                                                    style="background-color: var(--color-destructive);"></span>
                                                                <div class="apexcharts-tooltip-text"
                                                                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                                    <div class="apexcharts-tooltip-y-group"><span
                                                                            class="apexcharts-tooltip-text-y-label"></span><span
                                                                            class="apexcharts-tooltip-text-y-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-goals-group"><span
                                                                            class="apexcharts-tooltip-text-goals-label"></span><span
                                                                            class="apexcharts-tooltip-text-goals-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-z-group"><span
                                                                            class="apexcharts-tooltip-text-z-label"></span><span
                                                                            class="apexcharts-tooltip-text-z-value"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-2"
                                                                style="order: 3;"><span class="apexcharts-tooltip-marker"
                                                                    shape="circle"
                                                                    style="background-color: var(--color-green-500);"></span>
                                                                <div class="apexcharts-tooltip-text"
                                                                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                                    <div class="apexcharts-tooltip-y-group"><span
                                                                            class="apexcharts-tooltip-text-y-label"></span><span
                                                                            class="apexcharts-tooltip-text-y-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-goals-group"><span
                                                                            class="apexcharts-tooltip-text-goals-label"></span><span
                                                                            class="apexcharts-tooltip-text-goals-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-z-group"><span
                                                                            class="apexcharts-tooltip-text-z-label"></span><span
                                                                            class="apexcharts-tooltip-text-z-value"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-3"
                                                                style="order: 4;"><span class="apexcharts-tooltip-marker"
                                                                    shape="circle"
                                                                    style="background-color: var(--color-violet-500);"></span>
                                                                <div class="apexcharts-tooltip-text"
                                                                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                                    <div class="apexcharts-tooltip-y-group"><span
                                                                            class="apexcharts-tooltip-text-y-label"></span><span
                                                                            class="apexcharts-tooltip-text-y-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-goals-group"><span
                                                                            class="apexcharts-tooltip-text-goals-label"></span><span
                                                                            class="apexcharts-tooltip-text-goals-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-z-group"><span
                                                                            class="apexcharts-tooltip-text-z-label"></span><span
                                                                            class="apexcharts-tooltip-text-z-value"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-4"
                                                                style="order: 5;"><span class="apexcharts-tooltip-marker"
                                                                    shape="circle"
                                                                    style="background-color: var(--color-yellow-500);"></span>
                                                                <div class="apexcharts-tooltip-text"
                                                                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                                    <div class="apexcharts-tooltip-y-group"><span
                                                                            class="apexcharts-tooltip-text-y-label"></span><span
                                                                            class="apexcharts-tooltip-text-y-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-goals-group"><span
                                                                            class="apexcharts-tooltip-text-goals-label"></span><span
                                                                            class="apexcharts-tooltip-text-goals-value"></span>
                                                                    </div>
                                                                    <div class="apexcharts-tooltip-z-group"><span
                                                                            class="apexcharts-tooltip-text-z-label"></span><span
                                                                            class="apexcharts-tooltip-text-z-value"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end: grid -->
                                <!-- begin: grid -->
                                <div class="col-span-1 lg:col-span-2 gap-3">
                                    <div class="kt-card">
                                        <div class="kt-card-header">
                                            <h3 class="kt-card-title">
                                                Activity
                                            </h3>
                                            <div class="flex items-center gap-2">
                                                <label class="group text-sm font-medium inline-flex items-center gap-2">
                                                    <span class="inline-flex items-center gap-2">
                                                        Auto refresh:
                                                        <span class="group-has-checked:hidden">
                                                            Off
                                                        </span>
                                                        <span class="hidden group-has-checked:inline">
                                                            On
                                                        </span>
                                                    </span>
                                                    <input checked="" class="kt-switch kt-switch-sm" name="check"
                                                        type="checkbox" value="1">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="kt-card-content">
                                            <div class="flex flex-col">
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input">
                                                    </div>
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-people text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 mb-7 text-base grow">
                                                        <div class="flex flex-col">
                                                            <div class="text-sm text-foreground">
                                                                Posted a new article
                                                                <a class="text-sm font-medium kt-link"
                                                                    href="html/demo1/public-profile/profiles/blogger.html">
                                                                    Top 10 Tech Trends
                                                                </a>
                                                            </div>
                                                            <span class="text-xs text-secondary-foreground">
                                                                Today, 9:00 AM
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input">
                                                    </div>
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-entrance-left text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 mb-7 text-base grow">
                                                        <div class="flex flex-col">
                                                            <div class="text-sm text-foreground">
                                                                I had the privilege of interviewing an industry expert for
                                                                an
                                                                <a class="text-sm kt-link"
                                                                    href="html/demo1/public-profile/profiles/blogger.html">
                                                                    upcoming blog post
                                                                </a>
                                                            </div>
                                                            <span class="text-xs text-secondary-foreground">
                                                                2 days ago, 4:07 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input">
                                                    </div>
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-share text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 mb-7 text-base grow">
                                                        <div class="flex flex-col">
                                                            <div class="text-sm text-foreground">
                                                                I couldn't resist sharing a sneak peek of our
                                                                <a class="text-sm kt-link"
                                                                    href="html/demo1/public-profile/profiles/blogger.html">
                                                                    upcoming content
                                                                </a>
                                                            </div>
                                                            <span class="text-xs text-secondary-foreground">
                                                                5 days ago, 4:07 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input">
                                                    </div>
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-directbox-default text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 mb-7 text-base grow">
                                                        <div class="flex flex-col pb-2.5">
                                                            <span class="text-sm text-foreground">
                                                                Attending the virtual blogging conference was an enriching
                                                                experience
                                                            </span>
                                                            <span class="text-xs text-secondary-foreground">
                                                                2 days ago, 4:07 PM
                                                            </span>
                                                        </div>
                                                        <div class="kt-card shadow-none">
                                                            <div class="kt-card-content lg:py-4">
                                                                <div class="flex justify-center py-4">
                                                                    <img alt="image" class="dark:hidden max-h-[160px]"
                                                                        src="assets/media/illustrations/3.svg">
                                                                    <img alt="image" class="light:hidden max-h-[160px]"
                                                                        src="assets/media/illustrations/3-dark.svg">
                                                                </div>
                                                                <div class="flex flex-col gap-1">
                                                                    <div
                                                                        class="text-base font-medium text-mono text-center">
                                                                        Blogging Conference
                                                                    </div>
                                                                    <div class="flex items-center justify-center gap-1">
                                                                        <a class="text-sm font-semibold link"
                                                                            href="html/demo1/public-profile/profiles/company.html">
                                                                            Axio new release
                                                                        </a>
                                                                        <span
                                                                            class="text-sm text-secondary-foreground me-2">
                                                                            email campaign
                                                                        </span>
                                                                        <span
                                                                            class="kt-badge kt-badge-sm kt-badge-success kt-badge-outline">
                                                                            Public
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-input">
                                                    </div>
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-coffee text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 mb-7 text-base grow">
                                                        <div class="flex flex-col">
                                                            <div class="text-sm text-mono">
                                                                Reaching the milestone of
                                                                <a class="text-sm font-medium kt-ink"
                                                                    href="html/demo1/public-profile/profiles/feeds.html">
                                                                    10,000 followers
                                                                </a>
                                                                on the blog was a dream come true
                                                            </div>
                                                            <span class="text-xs text-secondary-foreground">
                                                                5 days ago, 4:07 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex items-start relative">
                                                    <div
                                                        class="flex items-center justify-center shrink-0 rounded-full bg-accent/60 border border-input size-9 text-secondary-foreground">
                                                        <i class="ki-filled ki-cup text-base">
                                                        </i>
                                                    </div>
                                                    <div class="ps-2.5 text-base grow">
                                                        <div class="flex flex-col">
                                                            <div class="text-sm text-foreground">
                                                                We recently
                                                                <a class="text-sm font-medium kt-link"
                                                                    href="html/demo1/public-profile/profiles/nft.html">
                                                                    celebrated
                                                                </a>
                                                                the blog's 1-year anniversary
                                                            </div>
                                                            <span class="text-xs text-secondary-foreground">
                                                                3 months ago, 4:07 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="kt-card-footer justify-center">
                                            <a class="kt-link kt-link-underlined kt-link-dashed"
                                                href="html/demo1/public-profile/activity.html">
                                                All-time Activities
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- end: grid -->

                            </div>
                        </div>
                        <!-- end: grid -->
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
                                <a class="text-secondary-foreground hover:text-primary" href="">
                                    my school .inc
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