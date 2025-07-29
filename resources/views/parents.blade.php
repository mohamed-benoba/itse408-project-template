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
                                    اولياء الامور
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
                        {{-- header card --}}
                        <div class="kt-card mb-4">
                            <div class="kt-container-fixed flex items-center justify-between flex-wrap gap-3">
                                <div class="flex items-center flex-wrap gap-1 lg:gap-5">
                                    <h1 class="font-medium text-lg text-mono">
                                        إدارة اولياء الامور
                                    </h1>
                                </div>

                                <div class="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
                                    {{-- drop down --}}
                                    <div class="kt-menu kt-menu-default" data-kt-menu="true">
                                        <div class="kt-menu-item kt-menu-item-dropdown" data-kt-menu-item-offset="0, 0"
                                            data-kt-menu-item-placement="bottom-end" data-kt-menu-item-toggle="dropdown"
                                            data-kt-menu-item-trigger="hover">
                                            <button class="kt-menu-toggle kt-btn kt-btn-outline flex-nowrap">
                                                <span class="flex items-center me-1">
                                                    <i class="ki-filled ki-calendar text-base!">
                                                    </i>
                                                </span>
                                                <span class="hidden md:inline text-nowrap">
                                                    جميع الفصول
                                                </span>
                                                <span class="inline md:hidden text-nowrap">
                                                    الفصول
                                                </span>
                                                <span class="flex items-center lg:ms-4">
                                                    <i class="ki-filled ki-down text-xs!">
                                                    </i>
                                                </span>
                                            </button>
                                            <div class="kt-menu-dropdown w-48 py-2 kt-scrollable-y max-h-[250px]" style="">
                                                <div class="kt-menu-item">
                                                    <a class="kt-menu-link" href="">
                                                        <span class="kt-menu-title">
                                                            الفصل الأول
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="kt-menu-item">
                                                    <a class="kt-menu-link" href="">
                                                        <span class="kt-menu-title">
                                                            الفصل الثاني
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="kt-menu-item">
                                                    <a class="kt-menu-link" href="">
                                                        <span class="kt-menu-title">
                                                            الفصل الثالث
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- table --}}
                        <div class="grid w-full space-y-5">
                            <div class="kt-card">
                                <div class="kt-card-header min-h-16">
                                    <input type="text" placeholder="البحث..." class="kt-input sm:w-48" />
                                    <button type="button" data-kt-drawer-toggle="#drawer" class="kt-btn kt-btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5v14"></path>
                                        </svg>
                                        إضافة ولي أمر
                                    </button>
                                </div>
                                <div class="kt-card-table" data-kt-datatable="true" data-kt-datatable-page-size="5"
                                    data-kt-datatable-state-save="true">
                                    <div class="kt-table-wrapper kt-scrollable">
                                        <table class="kt-table" data-kt-datatable-table="true">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="w-10" data-kt-datatable-column="parent-id">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">معرف ولي الأمر</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-30" data-kt-datatable-column="parent-name">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">اسم ولي الأمر</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-20" data-kt-datatable-column="phone">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">رقم الهاتف</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-20" data-kt-datatable-column="email">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">البريد الإلكتروني</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-15" data-kt-datatable-column="students">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">عدد الطلاب</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-15" data-kt-datatable-column="status">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">الحالة</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-10" data-kt-datatable-column="actions"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1001</td>
                                                    <td>أحمد محمد الورفلي</td>
                                                    <td>+218 91 234 5678</td>
                                                    <td>ahmed.werfelli@email.com</td>
                                                    <td>2</td>
                                                    <td><span class="kt-badge kt-badge-success">نشط</span></td>
                                                    <td class="text-end">
                                                        <span class="inline-flex gap-2.5">
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-pencil" aria-hidden="true"
                                                                    data-kt-drawer-toggle="#drawer">
                                                                    <path
                                                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                                    </path>
                                                                    <path d="m15 5 4 4"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-trash" aria-hidden="true">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1002</td>
                                                    <td>فاطمة علي بن ناصر</td>
                                                    <td>+218 92 345 6789</td>
                                                    <td>fatima.bennasser@email.com</td>
                                                    <td>1</td>
                                                    <td><span class="kt-badge kt-badge-success">نشط</span></td>
                                                    <td class="text-end">
                                                        <span class="inline-flex gap-2.5">
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-pencil" aria-hidden="true"
                                                                    data-kt-drawer-toggle="#drawer">
                                                                    <path
                                                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                                    </path>
                                                                    <path d="m15 5 4 4"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-trash" aria-hidden="true">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1003</td>
                                                    <td>عبد الله محمد المصراتي</td>
                                                    <td>+218 93 456 7890</td>
                                                    <td>abdullah.misurati@email.com</td>
                                                    <td>3</td>
                                                    <td><span class="kt-badge kt-badge-warning">معلق</span></td>
                                                    <td class="text-end">
                                                        <span class="inline-flex gap-2.5">
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-pencil" aria-hidden="true"
                                                                    data-kt-drawer-toggle="#drawer">
                                                                    <path
                                                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                                    </path>
                                                                    <path d="m15 5 4 4"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-trash" aria-hidden="true">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1004</td>
                                                    <td>آمنة أحمد الشاعري</td>
                                                    <td>+218 94 567 8901</td>
                                                    <td>amena.shaeri@email.com</td>
                                                    <td>1</td>
                                                    <td><span class="kt-badge kt-badge-danger">غير نشط</span></td>
                                                    <td class="text-end">
                                                        <span class="inline-flex gap-2.5">
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-pencil" aria-hidden="true"
                                                                    data-kt-drawer-toggle="#drawer">
                                                                    <path
                                                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                                    </path>
                                                                    <path d="m15 5 4 4"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-trash" aria-hidden="true">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1005</td>
                                                    <td>حنان محمد المبروك</td>
                                                    <td>+218 95 678 9012</td>
                                                    <td>hanan.mabrouk@email.com</td>
                                                    <td>2</td>
                                                    <td><span class="kt-badge kt-badge-success">نشط</span></td>
                                                    <td class="text-end">
                                                        <span class="inline-flex gap-2.5">
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-pencil" aria-hidden="true"
                                                                    data-kt-drawer-toggle="#drawer">
                                                                    <path
                                                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                                                                    </path>
                                                                    <path d="m15 5 4 4"></path>
                                                                </svg>
                                                            </a>
                                                            <a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" fill="none"
                                                                    stroke="currentColor" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round"
                                                                    class="lucide lucide-trash" aria-hidden="true">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                </svg>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--begin:pagination-->
                                    <div class="kt-datatable-toolbar">
                                        <div class="kt-datatable-length">
                                            عرض<select class="kt-select kt-select-sm w-16" name="perpage"
                                                data-kt-datatable-size="true"></select>في الصفحة
                                        </div>
                                        <div class="kt-datatable-info">
                                            <span data-kt-datatable-info="true"></span>
                                            <div class="kt-datatable-pagination" data-kt-datatable-pagination="true"></div>
                                        </div>
                                    </div>
                                    <!--end:pagination-->
                                </div>
                            </div>
                        </div>

                        {{-- drawer --}}
                        <div class="kt-drawer kt-drawer-end kt-card flex-col max-w-[90%] w-[520px] top-5 bottom-5 end-5 rounded-xl border border-border hidden"
                            data-kt-drawer="true" data-kt-drawer-container="body" id="drawer"
                            data-kt-drawer-initialized="true" style="">
                            <div class="kt-card-header px-5">
                                <h3 class="kt-card-title">
                                    إضافة ولي أمر جديد
                                </h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
                                    data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base">
                                    </i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <div class="space-y-4">
                                    <div>
                                        <label class="kt-form-label">اسم ولي الأمر</label>
                                        <input type="text" class="kt-input" placeholder="أدخل اسم ولي الأمر">
                                    </div>
                                    <div>
                                        <label class="kt-form-label">رقم الهاتف</label>
                                        <input type="tel" class="kt-input" placeholder="+218 91 234 5678">
                                    </div>
                                    <div>
                                        <label class="kt-form-label">البريد الإلكتروني</label>
                                        <input type="email" class="kt-input" placeholder="parent@email.com">
                                    </div>
                                    <div>
                                        <label class="kt-form-label">العنوان</label>
                                        <textarea class="kt-textarea" placeholder="أدخل العنوان الكامل"></textarea>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الحالة</label>
                                        <select class="kt-select">
                                            <option value="active">نشط</option>
                                            <option value="inactive">غير نشط</option>
                                            <option value="suspended">معلق</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex gap-2 pt-4">
                                    <button class="kt-btn kt-btn-primary flex-1">
                                        حفظ
                                    </button>
                                    <button class="kt-btn kt-btn-outline flex-1" data-kt-drawer-dismiss="true">
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
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