@extends('layout.app')

@section('body')
    <div class="flex flex-col lg:flex-row grow pt-(--header-height) lg:pt-0">
        <!-- Main -->
        <div class="flex flex-col grow items-stretch rounded-xl bg-background border border-input lg:ms-(--sidebar-width) mt-0 lg:mt-[15px] m-[15px]">
            <div class="flex flex-col grow kt-scrollable-y-auto [--kt-scrollbar-width:auto] pt-5" id="scrollable_content">
                <main class="grow" role="content">
                    <!-- Toolbar -->
                    <div class="pb-5">
                        <!-- Container -->
                        <div class="kt-container-fixed flex items-center justify-between flex-wrap gap-3">
                            <div class="flex items-center flex-wrap gap-1 lg:gap-5">
                                <h1 class="font-medium text-lg text-mono">
                                    إدارة المواد الدراسية
                                </h1>
                            </div>
                            <div class="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
                            <button type="button" data-kt-drawer-toggle="#drawer" class="kt-btn kt-btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5v14"></path>
                                        </svg>
                                        إضافة مادة دراسية
                                    </button>
                            </div>
                        </div>
                        <!-- End of Container -->
                    </div>
                    <!-- End of Toolbar -->
                    <!-- Container -->

                    {{-- hidden button to open edit drawer button --}}
                    <button id="openEditDrawerBtn" type="button" class="hidden" data-kt-drawer-toggle="#editDrawer"></button>

                    <div class="kt-container-fixed">
                       
                        {{-- table --}}
                        <div class="grid w-full space-y-5">
                            <div class="kt-card">
                                <div class="kt-card-header min-h-16">
                                    <input type="text" placeholder="البحث..." class="kt-input sm:w-48" id="subject-search" />
                                </div>
                                <div class="kt-card-table">
                                    <div class="kt-table-wrapper kt-scrollable">
                                        <table class="kt-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="w-10">#</th>
                                                    <th scope="col" class="w-25">اسم المادة</th>
                                                    <th scope="col" class="w-20">الوصف</th>
                                                    <th scope="col" class="w-15">عدد الحصص الأسبوعية</th>
                                                    <th scope="col" class="w-15">الفئة العمرية</th>
                                                    <th scope="col" class="w-15">المعلم</th>
                                                    <th scope="col" class="w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="subjects-table-body">
                                                @foreach($subjects as $subject)
                                                    <tr>
                                                        <td>{{ $subject->id }}</td>
                                                        <td>{{ $subject->name }}</td>
                                                        <td>{{ $subject->description }}</td>
                                                        <td>{{ $subject->weekly_lectures }}</td>
                                                        <td>{{ $subject->age_group }}</td>
                                                        <td>{{ $subject->teacher->name ?? 'غير محدد' }}</td>
                                                        <td class="text-end">
                                                            <span class="inline-flex gap-2.5">
                                                                <button type="button" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline edit-subject-btn" data-id="{{ $subject->id }}">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true">
                                                                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                                                        <path d="m15 5 4 4"></path>
                                                                    </svg>
                                                                </button>
                                                                <form action="{{ route('subjects.destroy', $subject->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد من حذف هذه المادة؟');">
                                                                    @csrf
                                                                    @method('DELETE')
                                                                    <button type="submit" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash" aria-hidden="true">
                                                                            <path d="M3 6h18"></path>
                                                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                        </svg>
                                                                    </button>
                                                                </form>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{-- drawer --}}
                        <div class="kt-drawer kt-drawer-end kt-card flex-col max-w-[90%] w-[520px] top-5 bottom-5 end-5 rounded-xl border border-border hidden" data-kt-drawer="true" data-kt-drawer-container="body" id="drawer" data-kt-drawer-initialized="true">
                            <div class="kt-card-header px-5">
                                <h3 class="kt-card-title">
                                    إضافة مادة دراسية جديدة
                                </h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0" data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base"></i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <form action="{{ route('subjects.store') }}" method="POST" class="space-y-4">
                                    @csrf
                                    <div>
                                        <label class="kt-form-label">اسم المادة</label>
                                        <input type="text" name="name" class="kt-input" placeholder="أدخل اسم المادة" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الوصف</label>
                                        <textarea name="description" class="kt-input" placeholder="أدخل وصف المادة" rows="3"></textarea>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">عدد الحصص الأسبوعية</label>
                                        <select name="weekly_lectures" class="kt-input" required>
                                            <option value="">اختر عدد الحصص</option>
                                            <option value="1">حصة واحدة</option>
                                            <option value="2">حصتان</option>
                                            <option value="3">ثلاث حصص</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الفئة العمرية</label>
                                        <select name="age_group" class="kt-input" required>
                                            <option value="">اختر الفئة العمرية</option>
                                            <option value="3">3 سنوات</option>
                                            <option value="4">4 سنوات</option>
                                            <option value="5">5 سنوات</option>
                                            <option value="6">6 سنوات</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">المعلم</label>
                                        <select name="teacher_id" class="kt-input" required>
                                            <option value="">اختر المعلم</option>
                                            @foreach($teachers as $teacher)
                                                <option value="{{ $teacher->id }}">{{ $teacher->name }} - {{ $teacher->specialty }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="flex gap-2 pt-4">
                                        <button type="submit" class="kt-btn kt-btn-primary flex-1">
                                            حفظ
                                        </button>
                                        <button type="button" class="kt-btn kt-btn-outline flex-1" data-kt-drawer-dismiss="true">
                                            إلغاء
                                        </button>
                                    </div>
                                </form>
                                @if($errors->any())
                                    <div class="alert alert-danger">
                                        <ul>
                                            @foreach($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif
                                @if(session('success'))
                                    <div class="alert alert-success">{{ session('success') }}</div>
                                @endif
                            </div>
                        </div>
                        {{-- Edit Drawer --}}
                        <div class="kt-drawer kt-drawer-end kt-card flex-col max-w-[90%] w-[520px] top-5 bottom-5 end-5 rounded-xl border border-border hidden" data-kt-drawer="true" data-kt-drawer-container="body" id="editDrawer" data-kt-drawer-initialized="true">
                            <div class="kt-card-header px-5">
                                <h3 class="kt-card-title">تعديل بيانات المادة</h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0" data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base"></i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <form id="edit-subject-form" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <div>
                                        <label class="kt-form-label">اسم المادة</label>
                                        <input type="text" name="name" id="edit-name" class="kt-input" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الوصف</label>
                                        <textarea name="description" id="edit-description" class="kt-input" rows="3"></textarea>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">عدد الحصص الأسبوعية</label>
                                        <select name="weekly_lectures" id="edit-weekly-lectures" class="kt-input" required>
                                            <option value="1">حصة واحدة</option>
                                            <option value="2">حصتان</option>
                                            <option value="3">ثلاث حصص</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الفئة العمرية</label>
                                        <select name="age_group" id="edit-age-group" class="kt-input" required>
                                            <option value="3">3 سنوات</option>
                                            <option value="4">4 سنوات</option>
                                            <option value="5">5 سنوات</option>
                                            <option value="6">6 سنوات</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">المعلم</label>
                                        <select name="teacher_id" id="edit-teacher-id" class="kt-input" required>
                                            @foreach($teachers as $teacher)
                                                <option value="{{ $teacher->id }}">{{ $teacher->name }} - {{ $teacher->specialty }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="flex gap-2 pt-4">
                                        <button type="submit" class="kt-btn kt-btn-primary flex-1">حفظ التعديلات</button>
                                        <button type="button" class="kt-btn kt-btn-outline flex-1" data-kt-drawer-dismiss="true">إلغاء</button>
                                    </div>
                                </form>
                                <div id="edit-errors" class="alert alert-danger d-none"></div>
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

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic search functionality
    const searchInput = document.getElementById('subject-search');
    const tableBody = document.getElementById('subjects-table-body');
    
    if (searchInput && tableBody) {
        searchInput.addEventListener('input', function () {
            const value = this.value.toLowerCase();
            Array.from(tableBody.rows).forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? '' : 'none';
            });
        });
    }

    // Edit drawer functionality - fetch data and open drawer
    const openEditDrawerBtn = document.getElementById('openEditDrawerBtn');
    const editButtons = document.querySelectorAll('.edit-subject-btn');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('data-id');
            
            fetch(`/subjects/${id}/edit`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok: ' + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    // Fill form fields with subject data
                    document.getElementById('edit-name').value = data.name;
                    document.getElementById('edit-description').value = data.description || '';
                    document.getElementById('edit-weekly-lectures').value = data.weekly_lectures;
                    document.getElementById('edit-age-group').value = data.age_group;
                    document.getElementById('edit-teacher-id').value = data.teacher_id;
                    document.getElementById('edit-subject-form').action = `/subjects/${id}`;

                    // Open drawer using built-in trigger
                    openEditDrawerBtn.click();
                })
                .catch(error => {
                    alert('Error loading subject data: ' + error.message);
                });
        });
    });
});
</script>
@endsection
