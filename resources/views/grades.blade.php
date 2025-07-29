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
                                    الدرجات
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
                            <div class="kt-container-fixed  flex items-center justify-between flex-wrap gap-3">
                                <div class="flex items-center flex-wrap gap-1 lg:gap-5">
                                    <h1 class="font-medium text-lg text-mono">
                                        رياضيات
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
                                                    September, 2024
                                                </span>
                                                <span class="inline md:hidden text-nowrap">
                                                    Sep, 2024
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
                                                            January, 2024
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
                                    <input type="text" placeholder="Search..." class="kt-input sm:w-48" />
                                    <button type="button" data-kt-drawer-toggle="#drawer" class="kt-btn kt-btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5v14"></path>
                                        </svg>
                                        Add
                                    </button>
                                </div>
                                <div class="kt-card-table" data-kt-datatable="true" data-kt-datatable-page-size="5"
                                    data-kt-datatable-state-save="true">
                                    <div class="kt-table-wrapper kt-scrollable">
                                        <table class="kt-table" data-kt-datatable-table="true">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="w-10" data-kt-datatable-column="student-id">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">معرف
                                                                الطالب</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-30" data-kt-datatable-column="student-name">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">اسم
                                                                الطالب</span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-15" data-kt-datatable-column="subject">
                                                        <span class="kt-table-col"><span
                                                                class="kt-table-col-label">المادة</span><span
                                                                class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-10" data-kt-datatable-column="student-grade">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">
                                                                درجة الطالب
                                                            </span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-15" data-kt-datatable-column="lastSession">
                                                        <span class="kt-table-col"><span class="kt-table-col-label">
                                                                تاريخ الرصد
                                                            </span><span class="kt-table-col-sort"></span></span>
                                                    </th>
                                                    <th scope="col" class="w-10" data-kt-datatable-column="actions"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>50</td>
                                                    <td>محمود الورفلي</td>
                                                    <td><span class="kt-badge kt-badge-success">عربي</span></td>
                                                    <td>23</td>
                                                    <td>26 Jun 2024</td>
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

<tr><td>51</td><td>سعاد بن ناصر</td><td><span class="kt-badge kt-badge-success">علوم</span></td><td>21</td><td>25 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>52</td><td>عبد الله المصراتي</td><td><span class="kt-badge kt-badge-warning">رياضيات</span></td><td>18</td><td>24 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>53</td><td>آمنة الشاعري</td><td><span class="kt-badge kt-badge-danger">إنجليزي</span></td><td>12</td><td>23 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>

<tr><td>55</td><td>حنان المبروك</td><td><span class="kt-badge kt-badge-success">أحياء</span></td><td>20</td><td>21 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>56</td><td>مروان السنوسي</td><td><span class="kt-badge kt-badge-warning">حاسوب</span></td><td>16</td><td>20 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>57</td><td>سارة خليفة</td><td><span class="kt-badge kt-badge-danger">كيمياء</span></td><td>9</td><td>19 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>58</td><td>جمال البرعصي</td><td><span class="kt-badge kt-badge-success">تاريخ</span></td><td>24</td><td>18 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>59</td><td>ليلى الأشهب</td><td><span class="kt-badge kt-badge-warning">جغرافيا</span></td><td>17</td><td>17 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>60</td><td>عماد الدباشي</td><td><span class="kt-badge kt-badge-success">إسلامية</span></td><td>22</td><td>16 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>61</td><td>هالة بوهديمة</td><td><span class="kt-badge kt-badge-success">عربي</span></td><td>23</td><td>15 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>62</td><td>يونس المقري</td><td><span class="kt-badge kt-badge-warning">رياضيات</span></td><td>15</td><td>14 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>63</td><td>كوثر القماطي</td><td><span class="kt-badge kt-badge-danger">فيزياء</span></td><td>8</td><td>13 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>64</td><td>أيمن بن عامر</td><td><span class="kt-badge kt-badge-success">حاسوب</span></td><td>20</td><td>12 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>65</td><td>رانية كراوة</td><td><span class="kt-badge kt-badge-warning">إنجليزي</span></td><td>19</td><td>11 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>66</td><td>فؤاد المقصبي</td><td><span class="kt-badge kt-badge-danger">كيمياء</span></td><td>11</td><td>10 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>67</td><td>جميلة ساسي</td><td><span class="kt-badge kt-badge-success">أحياء</span></td><td>24</td><td>09 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>68</td><td>مهند غيث</td><td><span class="kt-badge kt-badge-warning">علوم</span></td><td>17</td><td>08 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>69</td><td>هدى الغرياني</td><td><span class="kt-badge kt-badge-danger">جغرافيا</span></td><td>14</td><td>07 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>
<tr><td>70</td><td>طه الجازوي</td><td><span class="kt-badge kt-badge-success">تاريخ</span></td><td>22</td><td>06 Jun 2024</td><td class="text-end"><span class="inline-flex gap-2.5"><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true" data-kt-drawer-toggle="#drawer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></a><a href="" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></a></span></td></tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <!--begin:pagination-->
                                    <div class="kt-datatable-toolbar">
                                        <div class="kt-datatable-length">
                                            Show<select class="kt-select kt-select-sm w-16" name="perpage"
                                                data-kt-datatable-size="true"></select>per page
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
                                    Product Details
                                </h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
                                    data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base">
                                    </i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <div
                                    class="kt-card relative items-center justify-center bg-accent/50 mb-6.5 h-[280px] shadow-none">
                                    <span class="kt-badge kt-badge-destructive kt-badge-sm absolute top-4 end-4 uppercase">
                                        save 40%
                                    </span>
                                    <img alt="" class="size-80" src="assets/media/store/client/600x600/1.png">
                                    <div
                                        class="kt-card absolute items-center justify-center bg-background w-[75px] h-[45px] overflow-hidden rounded-sm bottom-4 end-4">
                                        <img alt="" class="dark:hidden" src="assets/media/brand-logos/nike-light.svg">
                                        <img alt="" class="hidden dark:block" src="assets/media/brand-logos/nike-dark.svg">
                                    </div>
                                </div>
                                <span class="text-base font-medium text-mono">
                                    Cloud Shift Lightweight Runner Pro Edition
                                </span>
                                <span class="text-sm font-normal text-foreground block mb-7">
                                    Lightweight and stylish, these sneakers offer all-day comfort with breathable mesh,
                                    cushioned soles, and a durable grip. Perfect for casual wear, workouts,
                                    or daily adventures. Available in multiple colors and sizes.
                                </span>
                                <div class="flex flex-col gap-2.5 lg:mb-11">
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-xs font-normal text-foreground min-w-14 xl:min-w-24 shrink-0">
                                            Avaibilaty
                                        </span>
                                        <div>
                                            <span class="kt-badge kt-badge-success kt-badge-sm">
                                                In Stock
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-xs font-normal text-foreground min-w-14 xl:min-w-24 shrink-0">
                                            SKU
                                        </span>
                                        <div>
                                            <span class="text-xs font-medium text-foreground">
                                                SH-001-BLK-42
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-xs font-normal text-foreground min-w-14 xl:min-w-24 shrink-0">
                                            Category
                                        </span>
                                        <div>
                                            <span class="text-xs font-medium text-foreground">
                                                Sneakers
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-xs font-normal text-foreground min-w-14 xl:min-w-24 shrink-0">
                                            Rating
                                        </span>
                                        <div>
                                            <div class="kt-rating">
                                                <div class="kt-rating-label checked">
                                                    <i class="kt-rating-on ki-solid ki-star text-base leading-none">
                                                    </i>
                                                    <i class="kt-rating-off ki-outline ki-star text-base leading-none">
                                                    </i>
                                                </div>
                                                <div class="kt-rating-label checked">
                                                    <i class="kt-rating-on ki-solid ki-star text-base leading-none">
                                                    </i>
                                                    <i class="kt-rating-off ki-outline ki-star text-base leading-none">
                                                    </i>
                                                </div>
                                                <div class="kt-rating-label checked">
                                                    <i class="kt-rating-on ki-solid ki-star text-base leading-none">
                                                    </i>
                                                    <i class="kt-rating-off ki-outline ki-star text-base leading-none">
                                                    </i>
                                                </div>
                                                <div class="kt-rating-label checked">
                                                    <i class="kt-rating-on ki-solid ki-star text-base leading-none">
                                                    </i>
                                                    <i class="kt-rating-off ki-outline ki-star text-base leading-none">
                                                    </i>
                                                </div>
                                                <div class="kt-rating-label checked">
                                                    <i class="kt-rating-on ki-solid ki-star text-base leading-none">
                                                    </i>
                                                    <i class="kt-rating-off ki-outline ki-star text-base leading-none">
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2.5">
                                        <span class="text-xs font-normal text-foreground min-w-14 xl:min-w-24 shrink-0">
                                            Mor Info
                                        </span>
                                        <div>
                                            <span class="text-xs font-normal text-foreground">
                                                10g powder, powder measure &amp; water dispensing bottle (empty)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-end gap-2">
                                    <span class="text-base font-normal text-secondary-foreground line-through">
                                        $140.00
                                    </span>
                                    <span class="text-lg font-medium text-mono">
                                        $99.00
                                    </span>
                                </div>
                            </div>
                            <div class="kt-card-footer px-5">
                                <button class="kt-btn kt-btn-primary grow">
                                    <i class="ki-filled ki-handcart">
                                    </i>
                                    Add to Cart
                                </button>
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