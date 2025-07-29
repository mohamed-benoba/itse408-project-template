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
                                    لوحة التحكم
                                </h1>
                            </div>
                            <div class="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
                                <h2 class="font-small text-lg text-mono">
                                    {{ date('Y-m-d') }}
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
                            <!-- begin: stats grid -->
                            <div class="kt-card-content border-1 rounded-xl border-gray-100 dark:border-gray-300/50 ">
                                <div class="flex lg:px-10 py-1.5 gap-2 ">
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            1,234
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            إجمالي المستخدمين
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            89%
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            معدل النشاط
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            156
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            المهام المكتملة
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                    <div class="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                        <span class="text-mono text-2xl lg:text-2xl leading-none font-semibold">
                                            27
                                        </span>
                                        <span class="text-secondary-foreground text-sm">
                                            المهام الجديدة
                                        </span>
                                    </div>
                                    <span class="not-last:border-e border-e-input my-1">
                                    </span>
                                </div>
                            </div>
                            <!-- end: stats grid -->
                            
                            <!-- begin: content grid -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
                                <!-- Welcome Card -->
                                <div class="kt-card">
                                    <div class="kt-card-header gap-2">
                                        <h3 class="kt-card-title">
                                            مرحباً بك
                                        </h3>
                                    </div>
                                    <div class="kt-card-body">
                                        <p class="text-secondary-foreground">
                                            مرحباً بك في لوحة التحكم. يمكنك من هنا إدارة جميع جوانب النظام.
                                        </p>
                                        <div class="mt-4">
                                            <a href="#" class="kt-btn kt-btn-primary">
                                                <i class="ki-filled ki-plus"></i>
                                                إنشاء مهمة جديدة
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Quick Actions -->
                                <div class="kt-card">
                                    <div class="kt-card-header gap-2">
                                        <h3 class="kt-card-title">
                                            الإجراءات السريعة
                                        </h3>
                                    </div>
                                    <div class="kt-card-body">
                                        <div class="grid grid-cols-2 gap-3">
                                            <a href="#" class="kt-btn kt-btn-outline">
                                                <i class="ki-filled ki-profile-circle"></i>
                                                الملف الشخصي
                                            </a>
                                            <a href="#" class="kt-btn kt-btn-outline">
                                                <i class="ki-filled ki-setting-2"></i>
                                                الإعدادات
                                            </a>
                                            <a href="#" class="kt-btn kt-btn-outline">
                                                <i class="ki-filled ki-notification-status"></i>
                                                الإشعارات
                                            </a>
                                            <a href="#" class="kt-btn kt-btn-outline">
                                                <i class="ki-filled ki-shield-tick"></i>
                                                الأمان
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end: content grid -->

                            <!-- Recent Activity -->
                            <div class="kt-card">
                                <div class="kt-card-header gap-2">
                                    <h3 class="kt-card-title">
                                        النشاطات الأخيرة
                                    </h3>
                                </div>
                                <div class="kt-card-body">
                                    <div class="space-y-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium">تم تسجيل الدخول بنجاح</p>
                                                <p class="text-xs text-secondary-foreground">منذ 5 دقائق</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium">تم تحديث الملف الشخصي</p>
                                                <p class="text-xs text-secondary-foreground">منذ ساعة</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <div class="flex-1">
                                                <p class="text-sm font-medium">تم إنشاء مهمة جديدة</p>
                                                <p class="text-xs text-secondary-foreground">منذ 3 ساعات</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end: grid -->
                    </div>
                    <!-- End of Container -->
                </main>
            </div>
        </div>
    </div>
@endsection