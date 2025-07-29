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
                                    الطلبة
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
                                        إدارة الطلبة
                                    </h1>
                                </div>
                                <div class="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
                                    <button type="button" data-kt-drawer-toggle="#drawer" class="kt-btn kt-btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5v14"></path>
                                        </svg>
                                        إضافة طالب
                                    </button>
                                </div>
                            </div>
                        </div>
                        {{-- table --}}
                        <div class="grid w-full space-y-5">
                            <div class="kt-card">
                                <div class="kt-card-header min-h-16">
                                    <input type="text" placeholder="البحث..." class="kt-input sm:w-48" id="student-search" />
                                </div>
                                <div class="kt-card-table">
                                    <div class="kt-table-wrapper kt-scrollable">
                                        <table class="kt-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="w-10">#</th>
                                                    <th scope="col" class="w-30">اسم الطالب</th>
                                                    <th scope="col" class="w-20">البريد الإلكتروني</th>
                                                    <th scope="col" class="w-10">العمر</th>
                                                    <th scope="col" class="w-15">الصف</th>
                                                    <th scope="col" class="w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="students-table-body">
                                                @foreach($students as $student)
                                                    <tr>
                                                        <td>{{ $student->id }}</td>
                                                        <td>{{ $student->name }}</td>
                                                        <td>{{ $student->email }}</td>
                                                        <td>{{ $student->age }}</td>
                                                        <td>{{ $student->class }}</td>
                                                        <td class="text-end">
                                                            <span class="inline-flex gap-2.5">
                                                                <button type="button" class="kt-btn kt-btn-sm kt-btn-icon kt-btn-outline edit-student-btn" data-id="{{ $student->id }}">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true">
                                                                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                                                        <path d="m15 5 4 4"></path>
                                                                    </svg>
                                                                </button>
                                                                <form action="{{ route('students.destroy', $student->id) }}" method="POST" onsubmit="return confirm('هل أنت متأكد من الحذف؟');">
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
                                    إضافة طالب جديد
                                </h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0" data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base"></i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <form action="{{ route('students.store') }}" method="POST" class="space-y-4">
                                    @csrf
                                    <div>
                                        <label class="kt-form-label">اسم الطالب</label>
                                        <input type="text" name="name" class="kt-input" placeholder="أدخل اسم الطالب" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">البريد الإلكتروني</label>
                                        <input type="email" name="email" class="kt-input" placeholder="student@email.com" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">العمر</label>
                                        <input type="number" name="age" class="kt-input" placeholder="أدخل عمر الطالب" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الصف</label>
                                        <input type="text" name="class" class="kt-input" placeholder="أدخل الصف" required>
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
                                <h3 class="kt-card-title">تعديل بيانات الطالب</h3>
                                <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0" data-kt-drawer-dismiss="true">
                                    <i class="ki-filled ki-cross text-base"></i>
                                </button>
                            </div>
                            <div class="kt-card-content flex flex-col space-y-3 p-5 kt-scrollable-y-auto">
                                <form id="edit-student-form" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <div>
                                        <label class="kt-form-label">اسم الطالب</label>
                                        <input type="text" name="name" id="edit-name" class="kt-input" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">البريد الإلكتروني</label>
                                        <input type="email" name="email" id="edit-email" class="kt-input" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">العمر</label>
                                        <input type="number" name="age" id="edit-age" class="kt-input" required>
                                    </div>
                                    <div>
                                        <label class="kt-form-label">الصف</label>
                                        <input type="text" name="class" id="edit-class" class="kt-input" required>
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
                                <a class="hover:text-primary" href="https://keenthemes.com/metronic/tailwind/docs/getting-started/license">
                                    FAQ
                                </a>
                                <a class="hover:text-primary" href="https://devs.keenthemes.com">
                                    Support
                                </a>
                                <a class="hover:text-primary" href="https://keenthemes.com/metronic/tailwind/docs/getting-started/license">
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
// بحث ديناميكي
const searchInput = document.getElementById('student-search');
const tableBody = document.getElementById('students-table-body');
searchInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    Array.from(tableBody.rows).forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(value) ? '' : 'none';
    });
});
// فتح دروار التعديل وتعبئة البيانات
const editDrawer = document.getElementById('editDrawer');
document.querySelectorAll('.edit-student-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        fetch(`/students/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('edit-name').value = data.name;
                document.getElementById('edit-email').value = data.email;
                document.getElementById('edit-age').value = data.age;
                document.getElementById('edit-class').value = data.class;
                document.getElementById('edit-student-form').action = `/students/${id}`;
                editDrawer.classList.remove('hidden');
            });
    });
});
// إغلاق الدروار عند الضغط على إلغاء أو زر الإغلاق
editDrawer.querySelectorAll('[data-kt-drawer-dismiss]').forEach(btn => {
    btn.addEventListener('click', () => editDrawer.classList.add('hidden'));
});
</script>
@endsection