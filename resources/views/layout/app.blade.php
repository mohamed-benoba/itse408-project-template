<!DOCTYPE html>
<html class="h-full" data-kt-theme="true" data-kt-theme-mode="light" dir="rtl" lang="ar">

{{-- <head> start --}}

@include('layout.head')

{{-- <head> end --}}


<body
       class="antialiased flex h-full text-base text-foreground bg-background [--header-height:60px] [--sidebar-width:270px] lg:overflow-hidden bg-muted">
       <!-- Theme Mode -->
       <script>
              const defaultThemeMode = 'light'; // light|dark|system
              let themeMode;

              if (document.documentElement) {
                     if (localStorage.getItem('kt-theme')) {
                            themeMode = localStorage.getItem('kt-theme');
                     } else if (
                            document.documentElement.hasAttribute('data-kt-theme-mode')
                     ) {
                            themeMode =
                                   document.documentElement.getAttribute('data-kt-theme-mode');
                     } else {
                            themeMode = defaultThemeMode;
                     }

                     if (themeMode === 'system') {
                            themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
                                   ? 'dark'
                                   : 'light';
                     }

                     document.documentElement.classList.add(themeMode);
              }
       </script>
       <!-- End of Theme Mode -->
       <!-- Page -->
       <!-- Base -->
       <div class="flex grow">
              <!-- Header -->
              <header class="flex lg:hidden items-center fixed z-10 top-0 start-0 end-0 shrink-0 bg-muted h-(--header-height)"
                     id="header">
                     <!-- Container -->
                     <div class="kt-container-fixed flex items-center justify-between flex-wrap gap-3">
                            <a href="#">
                                   <img class="dark:hidden min-h-[30px]" src="assets/media/app/mini-logo-gray.svg" />
                                   <img class="hidden dark:block min-h-[30px]"
                                          src="assets/media/app/mini-logo-gray-dark.svg" />
                            </a>
                            <button class="kt-btn kt-btn-icon kt-btn-ghost -me-2" data-kt-drawer-toggle="#sidebar">
                                   <i class="ki-filled ki-menu">
                                   </i>
                            </button>
                     </div>
                     <!-- End of Container -->
              </header>
              <!-- End of Header -->
              <!-- Sidebar -->
              @include('layout.sidebar')
              <!-- End of Sidebar -->
              <!-- Wrapper -->
              @yield('body')
              <!-- End of Wrapper -->
       </div>

       <!-- End of Base -->
       <div class="kt-modal" data-kt-modal="true" id="search_modal">
              <div class="kt-modal-content max-w-[600px] top-[15%]">
                     <div class="kt-modal-header py-4 px-5">
                            <i class="ki-filled ki-magnifier text-muted-foreground text-xl">
                            </i>
                            <input class="kt-input kt-input-ghost" name="query" placeholder="Tap to start search"
                                   type="text" value="" />
                            <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-dim shrink-0"
                                   data-kt-modal-dismiss="true">
                                   <i class="ki-filled ki-cross">
                                   </i>
                            </button>
                     </div>
                     <div class="kt-modal-body p-0 pb-5">
                            <div class="kt-tabs kt-tabs-line justify-between px-5 mb-2.5" data-kt-tabs="true">
                                   <div class="flex items-center gap-5">
                                          <button class="kt-tab-toggle py-5 active"
                                                 data-kt-tab-toggle="#search_modal_mixed">
                                                 Mixed
                                          </button>
                                          <button class="kt-tab-toggle py-5"
                                                 data-kt-tab-toggle="#search_modal_settings">
                                                 Settings
                                          </button>
                                          <button class="kt-tab-toggle py-5"
                                                 data-kt-tab-toggle="#search_modal_integrations">
                                                 Integrations
                                          </button>
                                          <button class="kt-tab-toggle py-5" data-kt-tab-toggle="#search_modal_users">
                                                 Users
                                          </button>
                                          <button class="kt-tab-toggle py-5" data-kt-tab-toggle="#search_modal_docs">
                                                 Docs
                                          </button>
                                          <button class="kt-tab-toggle py-5" data-kt-tab-toggle="#search_modal_empty">
                                                 Empty
                                          </button>
                                          <button class="kt-tab-toggle py-5"
                                                 data-kt-tab-toggle="#search_modal_no-results">
                                                 No Results
                                          </button>
                                   </div>
                                   <div class="kt-menu -mt-px" data-kt-menu="true">
                                          <div class="kt-menu-item" data-kt-menu-item-offset="0, 10px"
                                                 data-kt-menu-item-placement="bottom-end"
                                                 data-kt-menu-item-placement-rtl="bottom-start"
                                                 data-kt-menu-item-toggle="dropdown" data-kt-menu-item-trigger="click">
                                                 <button class="kt-menu-toggle kt-btn kt-btn-icon kt-btn-ghost">
                                                        <i class="ki-filled ki-setting-2">
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
                                                                             View
                                                                      </span>
                                                               </a>
                                                        </div>
                                                        <div class="kt-menu-item" data-kt-menu-item-offset="-15px, 0"
                                                               data-kt-menu-item-placement="right-start"
                                                               data-kt-menu-item-toggle="dropdown"
                                                               data-kt-menu-item-trigger="click|lg:hover">
                                                               <div class="kt-menu-link">
                                                                      <span class="kt-menu-icon">
                                                                             <i
                                                                                    class="ki-filled ki-notification-status">
                                                                             </i>
                                                                      </span>
                                                                      <span class="kt-menu-title">
                                                                             Export
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
                                                                                           <i
                                                                                                  class="ki-filled ki-message-notify">
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
                                                                                           <i
                                                                                                  class="ki-filled ki-notification-status">
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
                                                               <a class="kt-menu-link" href="#">
                                                                      <span class="kt-menu-icon">
                                                                             <i class="ki-filled ki-pencil">
                                                                             </i>
                                                                      </span>
                                                                      <span class="kt-menu-title">
                                                                             Edit
                                                                      </span>
                                                               </a>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <a class="kt-menu-link" href="#">
                                                                      <span class="kt-menu-icon">
                                                                             <i class="ki-filled ki-trash">
                                                                             </i>
                                                                      </span>
                                                                      <span class="kt-menu-title">
                                                                             Delete
                                                                      </span>
                                                               </a>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                            <div class="kt-scrollable-y-auto" data-kt-scrollable="true"
                                   data-kt-scrollable-max-height="auto" data-kt-scrollable-offset="300px">
                                   <div class="" id="search_modal_mixed">
                                          <div class="flex flex-col gap-2.5">
                                                 <div>
                                                        <div
                                                               class="text-xs text-secondary-foreground font-medium pt-2.5 pb-1.5 ps-5">
                                                               Settings
                                                        </div>
                                                        <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                               <div class="kt-menu-item">
                                                                      <a class="kt-menu-link" href="#">
                                                                             <span class="kt-menu-icon">
                                                                                    <i class="ki-filled ki-badge">
                                                                                    </i>
                                                                             </span>
                                                                             <span class="kt-menu-title">
                                                                                    Public Profile
                                                                             </span>
                                                                      </a>
                                                               </div>
                                                               <div class="kt-menu-item">
                                                                      <a class="kt-menu-link" href="#">
                                                                             <span class="kt-menu-icon">
                                                                                    <i class="ki-filled ki-setting-2">
                                                                                    </i>
                                                                             </span>
                                                                             <span class="kt-menu-title">
                                                                                    My Account
                                                                             </span>
                                                                      </a>
                                                               </div>
                                                               <div class="kt-menu-item">
                                                                      <a class="kt-menu-link" href="#">
                                                                             <span class="kt-menu-icon">
                                                                                    <i
                                                                                           class="ki-filled ki-message-programming">
                                                                                    </i>
                                                                             </span>
                                                                             <span class="kt-menu-title">
                                                                                    Devs Forum
                                                                             </span>
                                                                      </a>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="border-b border-b-border">
                                                 </div>
                                                 <div>
                                                        <div
                                                               class="text-xs text-secondary-foreground font-medium pt-2.5 pb-1.5 ps-5">
                                                               Integrations
                                                        </div>
                                                        <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                               <div class="kt-menu-item">
                                                                      <div
                                                                             class="kt-menu-link flex items-center jistify-between gap-2">
                                                                             <div class="flex items-center grow gap-2">
                                                                                    <div
                                                                                           class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                                           <img alt=""
                                                                                                  class="size-6 shrink-0"
                                                                                                  src="assets/media/brand-logos/jira.svg" />
                                                                                    </div>
                                                                                    <div class="flex flex-col gap-0.5">
                                                                                           <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                                  href="#">
                                                                                                  Jira
                                                                                           </a>
                                                                                           <span
                                                                                                  class="text-xs font-medium text-secondary-foreground">
                                                                                                  Project management
                                                                                           </span>
                                                                                    </div>
                                                                             </div>
                                                                             <div class="flex justify-end shrink-0">
                                                                                    <div class="flex -space-x-2">
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-4.png" />
                                                                                           </div>
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-1.png" />
                                                                                           </div>
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-2.png" />
                                                                                           </div>
                                                                                           <div class="flex">
                                                                                                  <span
                                                                                                         class="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-white size-6 ring-background bg-green-500">
                                                                                                         +3
                                                                                                  </span>
                                                                                           </div>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                               <div class="kt-menu-item">
                                                                      <div
                                                                             class="kt-menu-link flex items-center jistify-between gap-2">
                                                                             <div class="flex items-center grow gap-2">
                                                                                    <div
                                                                                           class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                                           <img alt=""
                                                                                                  class="size-6 shrink-0"
                                                                                                  src="assets/media/brand-logos/inferno.svg" />
                                                                                    </div>
                                                                                    <div class="flex flex-col gap-0.5">
                                                                                           <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                                  href="#">
                                                                                                  Inferno
                                                                                           </a>
                                                                                           <span
                                                                                                  class="text-xs font-medium text-secondary-foreground">
                                                                                                  Real-time photo
                                                                                                  sharing app
                                                                                           </span>
                                                                                    </div>
                                                                             </div>
                                                                             <div class="flex justify-end shrink-0">
                                                                                    <div class="flex -space-x-2">
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-14.png" />
                                                                                           </div>
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-12.png" />
                                                                                           </div>
                                                                                           <div class="flex">
                                                                                                  <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                                         src="assets/media/avatars/300-9.png" />
                                                                                           </div>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="border-b border-b-border">
                                                 </div>
                                                 <div>
                                                        <div
                                                               class="text-xs text-secondary-foreground font-medium pt-2.5 pb-1.5 ps-5">
                                                               Users
                                                        </div>
                                                        <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                               <div class="grid gap-1">
                                                                      <div class="kt-menu-item">
                                                                             <div
                                                                                    class="kt-menu-link flex justify-between gap-2">
                                                                                    <div
                                                                                           class="flex items-center gap-2.5">
                                                                                           <img alt=""
                                                                                                  class="rounded-full size-9 shrink-0"
                                                                                                  src="assets/media/avatars/300-3.png" />
                                                                                           <div class="flex flex-col">
                                                                                                  <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                                         href="#">
                                                                                                         Tyler Hero
                                                                                                  </a>
                                                                                                  <span
                                                                                                         class="text-2sm font-normal text-muted-foreground">
                                                                                                         tyler.hero@gmail.com
                                                                                                         connections
                                                                                                  </span>
                                                                                           </div>
                                                                                    </div>
                                                                                    <div
                                                                                           class="flex items-center gap-2.5">
                                                                                           <div
                                                                                                  class="kt-badge rounded-full kt-badge-outline kt-badge-success gap-1.5">
                                                                                                  <span
                                                                                                         class="kt-badge-dot">
                                                                                                  </span>
                                                                                                  In Office
                                                                                           </div>
                                                                                           <button
                                                                                                  class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                                  <i
                                                                                                         class="ki-filled ki-dots-vertical text-lg">
                                                                                                  </i>
                                                                                           </button>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                                      <div class="kt-menu-item">
                                                                             <div
                                                                                    class="kt-menu-link flex justify-between gap-2">
                                                                                    <div
                                                                                           class="flex items-center gap-2.5">
                                                                                           <img alt=""
                                                                                                  class="rounded-full size-9 shrink-0"
                                                                                                  src="assets/media/avatars/300-1.png" />
                                                                                           <div class="flex flex-col">
                                                                                                  <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                                         href="#">
                                                                                                         Esther Howard
                                                                                                  </a>
                                                                                                  <span
                                                                                                         class="text-2sm font-normal text-muted-foreground">
                                                                                                         esther.howard@gmail.com
                                                                                                         connections
                                                                                                  </span>
                                                                                           </div>
                                                                                    </div>
                                                                                    <div
                                                                                           class="flex items-center gap-2.5">
                                                                                           <div
                                                                                                  class="kt-badge rounded-full kt-badge-outline kt-badge-destructive gap-1.5">
                                                                                                  <span
                                                                                                         class="kt-badge-dot">
                                                                                                  </span>
                                                                                                  On Leave
                                                                                           </div>
                                                                                           <button
                                                                                                  class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                                  <i
                                                                                                         class="ki-filled ki-dots-vertical text-lg">
                                                                                                  </i>
                                                                                           </button>
                                                                                    </div>
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_settings">
                                          <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                 <div
                                                        class="text-xs text-secondary-foreground font-medium pt-2.5 ps-5 pb-1.5">
                                                        Shortcuts
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-home-2">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Go to Dashboard
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-badge">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Public Profile
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-profile-circle">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      My Profile
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-setting-2">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      My Account
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-message-programming">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Devs Forum
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div
                                                        class="text-xs text-secondary-foreground font-medium pt-2.5 ps-5 pt-2.5 pb-1.5">
                                                        Actions
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-user">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Create User
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-user-edit">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Create Team
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-subtitle">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Change Plan
                                                               </span>
                                                        </a>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <a class="kt-menu-link" href="#">
                                                               <span class="kt-menu-icon">
                                                                      <i class="ki-filled ki-setting">
                                                                      </i>
                                                               </span>
                                                               <span class="kt-menu-title">
                                                                      Setup Branding
                                                               </span>
                                                        </a>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_integrations">
                                          <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                 <div class="kt-menu-item">
                                                        <div
                                                               class="kt-menu-link flex items-center jistify-between gap-2">
                                                               <div class="flex items-center grow gap-2">
                                                                      <div
                                                                             class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                             <img alt="" class="size-6 shrink-0"
                                                                                    src="assets/media/brand-logos/jira.svg" />
                                                                      </div>
                                                                      <div class="flex flex-col gap-0.5">
                                                                             <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                    href="#">
                                                                                    Jira
                                                                             </a>
                                                                             <span
                                                                                    class="text-xs font-medium text-secondary-foreground">
                                                                                    Project management
                                                                             </span>
                                                                      </div>
                                                               </div>
                                                               <div class="flex justify-end shrink-0">
                                                                      <div class="flex -space-x-2">
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-4.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-1.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-2.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <span
                                                                                           class="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-2xs size-6 text-white size-6 ring-background bg-green-500">
                                                                                           +3
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <div
                                                               class="kt-menu-link flex items-center jistify-between gap-2">
                                                               <div class="flex items-center grow gap-2">
                                                                      <div
                                                                             class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                             <img alt="" class="size-6 shrink-0"
                                                                                    src="assets/media/brand-logos/inferno.svg" />
                                                                      </div>
                                                                      <div class="flex flex-col gap-0.5">
                                                                             <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                    href="#">
                                                                                    Inferno
                                                                             </a>
                                                                             <span
                                                                                    class="text-xs font-medium text-secondary-foreground">
                                                                                    Real-time photo sharing app
                                                                             </span>
                                                                      </div>
                                                               </div>
                                                               <div class="flex justify-end shrink-0">
                                                                      <div class="flex -space-x-2">
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-14.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-12.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-9.png" />
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <div
                                                               class="kt-menu-link flex items-center jistify-between gap-2">
                                                               <div class="flex items-center grow gap-2">
                                                                      <div
                                                                             class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                             <img alt="" class="size-6 shrink-0"
                                                                                    src="assets/media/brand-logos/evernote.svg" />
                                                                      </div>
                                                                      <div class="flex flex-col gap-0.5">
                                                                             <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                    href="#">
                                                                                    Evernote
                                                                             </a>
                                                                             <span
                                                                                    class="text-xs font-medium text-secondary-foreground">
                                                                                    Notes management app
                                                                             </span>
                                                                      </div>
                                                               </div>
                                                               <div class="flex justify-end shrink-0">
                                                                      <div class="flex -space-x-2">
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-6.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-3.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-1.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-8.png" />
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <div
                                                               class="kt-menu-link flex items-center jistify-between gap-2">
                                                               <div class="flex items-center grow gap-2">
                                                                      <div
                                                                             class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                             <img alt="" class="size-6 shrink-0"
                                                                                    src="assets/media/brand-logos/gitlab.svg" />
                                                                      </div>
                                                                      <div class="flex flex-col gap-0.5">
                                                                             <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                    href="#">
                                                                                    Gitlab
                                                                             </a>
                                                                             <span
                                                                                    class="text-xs font-medium text-secondary-foreground">
                                                                                    Notes management app
                                                                             </span>
                                                                      </div>
                                                               </div>
                                                               <div class="flex justify-end shrink-0">
                                                                      <div class="flex -space-x-2">
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-18.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-17.png" />
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="kt-menu-item">
                                                        <div
                                                               class="kt-menu-link flex items-center jistify-between gap-2">
                                                               <div class="flex items-center grow gap-2">
                                                                      <div
                                                                             class="flex items-center justify-center size-10 shrink-0 rounded-full border border-border bg-accent/60">
                                                                             <img alt="" class="size-6 shrink-0"
                                                                                    src="assets/media/brand-logos/google-webdev.svg" />
                                                                      </div>
                                                                      <div class="flex flex-col gap-0.5">
                                                                             <a class="text-sm font-semibold text-mono hover:text-primary"
                                                                                    href="#">
                                                                                    Google webdev
                                                                             </a>
                                                                             <span
                                                                                    class="text-xs font-medium text-secondary-foreground">
                                                                                    Building web expierences
                                                                             </span>
                                                                      </div>
                                                               </div>
                                                               <div class="flex justify-end shrink-0">
                                                                      <div class="flex -space-x-2">
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-14.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-20.png" />
                                                                             </div>
                                                                             <div class="flex">
                                                                                    <img class="hover:z-5 relative shrink-0 rounded-full ring-1 ring-background size-6"
                                                                                           src="assets/media/avatars/300-21.png" />
                                                                             </div>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <div class="kt-menu-item px-4 pt-2">
                                                        <a class="kt-btn kt-btn-outline justify-center" href="#">
                                                               Go to Apps
                                                        </a>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_users">
                                          <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                 <div class="grid gap-1">
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex justify-between gap-2">
                                                                      <div class="flex items-center gap-2.5">
                                                                             <img alt=""
                                                                                    class="rounded-full size-9 shrink-0"
                                                                                    src="assets/media/avatars/300-3.png" />
                                                                             <div class="flex flex-col">
                                                                                    <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                           href="#">
                                                                                           Tyler Hero
                                                                                    </a>
                                                                                    <span
                                                                                           class="text-2sm font-normal text-muted-foreground">
                                                                                           tyler.hero@gmail.com
                                                                                           connections
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <div class="flex items-center gap-2.5">
                                                                             <div
                                                                                    class="kt-badge rounded-full kt-badge-outline kt-badge-success gap-1.5">
                                                                                    <span class="kt-badge-dot">
                                                                                    </span>
                                                                                    In Office
                                                                             </div>
                                                                             <button
                                                                                    class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                    <i
                                                                                           class="ki-filled ki-dots-vertical text-lg">
                                                                                    </i>
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex justify-between gap-2">
                                                                      <div class="flex items-center gap-2.5">
                                                                             <img alt=""
                                                                                    class="rounded-full size-9 shrink-0"
                                                                                    src="assets/media/avatars/300-1.png" />
                                                                             <div class="flex flex-col">
                                                                                    <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                           href="#">
                                                                                           Esther Howard
                                                                                    </a>
                                                                                    <span
                                                                                           class="text-2sm font-normal text-muted-foreground">
                                                                                           esther.howard@gmail.com
                                                                                           connections
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <div class="flex items-center gap-2.5">
                                                                             <div
                                                                                    class="kt-badge rounded-full kt-badge-outline kt-badge-destructive gap-1.5">
                                                                                    <span class="kt-badge-dot">
                                                                                    </span>
                                                                                    On Leave
                                                                             </div>
                                                                             <button
                                                                                    class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                    <i
                                                                                           class="ki-filled ki-dots-vertical text-lg">
                                                                                    </i>
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex justify-between gap-2">
                                                                      <div class="flex items-center gap-2.5">
                                                                             <img alt=""
                                                                                    class="rounded-full size-9 shrink-0"
                                                                                    src="assets/media/avatars/300-11.png" />
                                                                             <div class="flex flex-col">
                                                                                    <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                           href="#">
                                                                                           Jacob Jones
                                                                                    </a>
                                                                                    <span
                                                                                           class="text-2sm font-normal text-muted-foreground">
                                                                                           jacob.jones@gmail.com
                                                                                           connections
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <div class="flex items-center gap-2.5">
                                                                             <div
                                                                                    class="kt-badge rounded-full kt-badge-outline kt-badge-primary gap-1.5">
                                                                                    <span class="kt-badge-dot">
                                                                                    </span>
                                                                                    Remote
                                                                             </div>
                                                                             <button
                                                                                    class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                    <i
                                                                                           class="ki-filled ki-dots-vertical text-lg">
                                                                                    </i>
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex justify-between gap-2">
                                                                      <div class="flex items-center gap-2.5">
                                                                             <img alt=""
                                                                                    class="rounded-full size-9 shrink-0"
                                                                                    src="assets/media/avatars/300-5.png" />
                                                                             <div class="flex flex-col">
                                                                                    <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                           href="#">
                                                                                           TLeslie Alexander
                                                                                    </a>
                                                                                    <span
                                                                                           class="text-2sm font-normal text-muted-foreground">
                                                                                           leslie.alexander@gmail.com
                                                                                           connections
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <div class="flex items-center gap-2.5">
                                                                             <div
                                                                                    class="kt-badge rounded-full kt-badge-outline kt-badge-success gap-1.5">
                                                                                    <span class="kt-badge-dot">
                                                                                    </span>
                                                                                    In Office
                                                                             </div>
                                                                             <button
                                                                                    class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                    <i
                                                                                           class="ki-filled ki-dots-vertical text-lg">
                                                                                    </i>
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex justify-between gap-2">
                                                                      <div class="flex items-center gap-2.5">
                                                                             <img alt=""
                                                                                    class="rounded-full size-9 shrink-0"
                                                                                    src="assets/media/avatars/300-2.png" />
                                                                             <div class="flex flex-col">
                                                                                    <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                                           href="#">
                                                                                           Cody Fisher
                                                                                    </a>
                                                                                    <span
                                                                                           class="text-2sm font-normal text-muted-foreground">
                                                                                           cody.fisher@gmail.com
                                                                                           connections
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <div class="flex items-center gap-2.5">
                                                                             <div
                                                                                    class="kt-badge rounded-full kt-badge-outline kt-badge-primary gap-1.5">
                                                                                    <span class="kt-badge-dot">
                                                                                    </span>
                                                                                    Remote
                                                                             </div>
                                                                             <button
                                                                                    class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                                    <i
                                                                                           class="ki-filled ki-dots-vertical text-lg">
                                                                                    </i>
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item px-4 pt-2">
                                                               <a class="kt-btn kt-btn-outline justify-center" href="#">
                                                                      Go to Users
                                                               </a>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_docs">
                                          <div class="kt-menu kt-menu-default px-0.5 flex-col">
                                                 <div class="grid">
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex items-center">
                                                                      <div class="flex items-center grow gap-2.5">
                                                                             <img
                                                                                    src="assets/media/file-types/pdf.svg" />
                                                                             <div class="flex flex-col">
                                                                                    <span
                                                                                           class="text-sm font-semibold text-mono cursor-pointer hover:text-primary mb-px">
                                                                                           Project-pitch.pdf
                                                                                    </span>
                                                                                    <span
                                                                                           class="text-xs font-medium text-muted-foreground">
                                                                                           4.7 MB 26 Sep 2024 3:20 PM
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <button
                                                                             class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                             <i
                                                                                    class="ki-filled ki-dots-vertical text-lg">
                                                                             </i>
                                                                      </button>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex items-center">
                                                                      <div class="flex items-center grow gap-2.5">
                                                                             <img
                                                                                    src="assets/media/file-types/doc.svg" />
                                                                             <div class="flex flex-col">
                                                                                    <span
                                                                                           class="text-sm font-semibold text-mono cursor-pointer hover:text-primary mb-px">
                                                                                           Report-v1.docx
                                                                                    </span>
                                                                                    <span
                                                                                           class="text-xs font-medium text-muted-foreground">
                                                                                           2.3 MB 1 Oct 2024 12:00 PM
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <button
                                                                             class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                             <i
                                                                                    class="ki-filled ki-dots-vertical text-lg">
                                                                             </i>
                                                                      </button>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex items-center">
                                                                      <div class="flex items-center grow gap-2.5">
                                                                             <img
                                                                                    src="assets/media/file-types/javascript.svg" />
                                                                             <div class="flex flex-col">
                                                                                    <span
                                                                                           class="text-sm font-semibold text-mono cursor-pointer hover:text-primary mb-px">
                                                                                           Framework-App.js
                                                                                    </span>
                                                                                    <span
                                                                                           class="text-xs font-medium text-muted-foreground">
                                                                                           0.8 MB 17 Oct 2024 6:46 PM
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <button
                                                                             class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                             <i
                                                                                    class="ki-filled ki-dots-vertical text-lg">
                                                                             </i>
                                                                      </button>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex items-center">
                                                                      <div class="flex items-center grow gap-2.5">
                                                                             <img
                                                                                    src="assets/media/file-types/ai.svg" />
                                                                             <div class="flex flex-col">
                                                                                    <span
                                                                                           class="text-sm font-semibold text-mono cursor-pointer hover:text-primary mb-px">
                                                                                           Framework-App.js
                                                                                    </span>
                                                                                    <span
                                                                                           class="text-xs font-medium text-muted-foreground">
                                                                                           0.8 MB 17 Oct 2024 6:46 PM
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <button
                                                                             class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                             <i
                                                                                    class="ki-filled ki-dots-vertical text-lg">
                                                                             </i>
                                                                      </button>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item">
                                                               <div class="kt-menu-link flex items-center">
                                                                      <div class="flex items-center grow gap-2.5">
                                                                             <img
                                                                                    src="assets/media/file-types/php.svg" />
                                                                             <div class="flex flex-col">
                                                                                    <span
                                                                                           class="text-sm font-semibold text-mono cursor-pointer hover:text-primary mb-px">
                                                                                           appController.js
                                                                                    </span>
                                                                                    <span
                                                                                           class="text-xs font-medium text-muted-foreground">
                                                                                           0.1 MB 21 Nov 2024 3:20 PM
                                                                                    </span>
                                                                             </div>
                                                                      </div>
                                                                      <button
                                                                             class="kt-btn kt-btn-icon kt-btn-ghost kt-btn-sm">
                                                                             <i
                                                                                    class="ki-filled ki-dots-vertical text-lg">
                                                                             </i>
                                                                      </button>
                                                               </div>
                                                        </div>
                                                        <div class="kt-menu-item px-4 pt-2.5">
                                                               <a class="kt-btn kt-btn-outline justify-center" href="#">
                                                                      Go to Users
                                                               </a>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_empty">
                                          <div class="flex flex-col text-center py-9 gap-5">
                                                 <div class="flex justify-center">
                                                        <img alt="image" class="dark:hidden max-h-[113px]"
                                                               src="assets/media/illustrations/33.svg" />
                                                        <img alt="image" class="light:hidden max-h-[113px]"
                                                               src="assets/media/illustrations/33-dark.svg" />
                                                 </div>
                                                 <div class="flex flex-col gap-1.5">
                                                        <h3 class="text-base font-semibold text-mono text-center">
                                                               Looking for something..
                                                        </h3>
                                                        <span
                                                               class="text-sm font-medium text-center text-secondary-foreground">
                                                               Initiate your digital experience with
                                                               <br>
                                                               our intuitive dashboard
                                                               </br>
                                                        </span>
                                                 </div>
                                                 <div class="flex justify-center">
                                                        <a class="kt-btn kt-btn-outline flex justify-center" href="#">
                                                               View Projects
                                                        </a>
                                                 </div>
                                          </div>
                                   </div>
                                   <div class="hidden" id="search_modal_no-results">
                                          <div class="flex flex-col text-center py-9 gap-5">
                                                 <div class="flex justify-center">
                                                        <img alt="image" class="dark:hidden max-h-[113px]"
                                                               src="assets/media/illustrations/33.svg" />
                                                        <img alt="image" class="light:hidden max-h-[113px]"
                                                               src="assets/media/illustrations/33-dark.svg" />
                                                 </div>
                                                 <div class="flex flex-col gap-1.5">
                                                        <h3 class="text-base font-semibold text-mono text-center">
                                                               No Results Found
                                                        </h3>
                                                        <span
                                                               class="text-sm font-medium text-center text-secondary-foreground">
                                                               Refine your query to discover relevant items
                                                        </span>
                                                 </div>
                                                 <div class="flex justify-center">
                                                        <a class="kt-btn kt-btn-outline flex justify-center" href="#">
                                                               View Projects
                                                        </a>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       </div>
       <!-- Share Profile Modal -->
       <div class="kt-modal" data-kt-modal="true" id="share_profile_modal">
              <div class="kt-modal-content max-w-[500px] top-5 lg:top-[15%]">
                     <div class="kt-modal-header">
                            <h3 class="kt-modal-title">
                                   Share Profile
                            </h3>
                            <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
                                   data-kt-modal-dismiss="true">
                                   <i class="ki-filled ki-cross">
                                   </i>
                            </button>
                     </div>
                     <div class="kt-modal-body grid gap-5 px-0 py-5">
                            <div class="flex flex-col px-5 gap-2.5">
                                   <div class="flex flex-center gap-1">
                                          <label class="text-mono font-semibold text-sm">
                                                 Share read-only link
                                          </label>
                                          <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
                                          </i>
                                   </div>
                                   <label class="kt-input">
                                          <input type="text" value="https://metronic.com/profiles/x7g2vA3kZ5" />
                                          <button class="kt-btn kt-btn-icon kt-btn-sm kt-btn-ghost -me-2">
                                                 <i class="ki-filled ki-copy">
                                                 </i>
                                          </button>
                                   </label>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex flex-col px-5 gap-2.5">
                                   <div class="flex flex-center gap-1">
                                          <label class="text-mono font-semibold text-sm">
                                                 Share via email
                                          </label>
                                          <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
                                          </i>
                                   </div>
                                   <div class="flex flex-center gap-2.5">
                                          <label class="kt-input">
                                                 <input type="text" value="miles.turner@gmail.com" />
                                          </label>
                                          <button class="kt-btn kt-btn-primary">
                                                 Share
                                          </button>
                                   </div>
                            </div>
                            <div class="kt-scrollable-y-auto max-h-[300px]">
                                   <div class="flex flex-col px-5 gap-3">
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-3.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Tyler Hero
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      tyler.hero@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option selected="">
                                                               Owner
                                                        </option>
                                                        <option>
                                                               Editor
                                                        </option>
                                                        <option>
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-1.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Esther Howard
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      esther.howard@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option>
                                                               Owner
                                                        </option>
                                                        <option selected="">
                                                               Editor
                                                        </option>
                                                        <option>
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-11.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Jacob Jones
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      jacob.jones@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option>
                                                               Owner
                                                        </option>
                                                        <option>
                                                               Editor
                                                        </option>
                                                        <option selected="">
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                   </div>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex flex-col px-5 gap-4">
                                   <label class="text-mono font-semibold text-sm">
                                          Settings
                                   </label>
                                   <div class="flex flex-center justify-between flex-wrap gap-2">
                                          <div class="flex flex-center gap-1.5">
                                                 <i class="ki-filled ki-user text-muted-foreground">
                                                 </i>
                                                 <div
                                                        class="flex flex-center text-secondary-foreground font-medium text-xs">
                                                        Anyone at
                                                        <a class="text-xs font-medium link mx-1" href="#">
                                                               corprate
                                                        </a>
                                                        can view
                                                 </div>
                                          </div>
                                          <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
                                                 Change Access
                                          </button>
                                   </div>
                                   <div class="flex flex-center justify-between flex-wrap gap-2 mb-2.5">
                                          <div class="flex flex-center gap-1.5">
                                                 <i class="ki-filled ki-icon text-muted-foreground">
                                                 </i>
                                                 <div
                                                        class="flex flex-center text-secondary-foreground font-medium text-xs">
                                                        Anyone with link can edit
                                                 </div>
                                          </div>
                                          <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
                                                 Set Password
                                          </button>
                                   </div>
                                   <button class="kt-btn kt-btn-primary justify-center">
                                          Done
                                   </button>
                            </div>
                     </div>
              </div>
       </div>
       <!-- End of Share Profile Modal -->
       <div class="kt-modal" data-kt-modal="true" id="give_award_modal">
              <div class="kt-modal-content max-w-[500px] top-[15%]">
                     <div class="kt-modal-header pr-2.5">
                            <h3 class="kt-modal-title">
                                   Give Award
                            </h3>
                            <button class="kt-btn kt-btn-icon kt-btn-ghost shrink-0" data-kt-modal-dismiss="true">
                                   <i class="ki-filled ki-black-left">
                                   </i>
                            </button>
                     </div>
                     <div class="kt-modal-body grid gap-5 px-0 py-5">
                            <div class="flex flex-col px-5 gap-2.5">
                                   <div class="flex flex-center gap-1">
                                          <label class="text-mono font-semibold text-sm">
                                                 Share read-only link
                                          </label>
                                          <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
                                          </i>
                                   </div>
                                   <label class="kt-input">
                                          <input type="text" value="https://metronic.com/profiles/x7g2vA3kZ5" />
                                          <button class="kt-btn kt-btn-icon kt-btn-sm kt-btn-ghost -me-2">
                                                 <i class="ki-filled ki-copy">
                                                 </i>
                                          </button>
                                   </label>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex flex-col px-5 gap-2.5">
                                   <div class="flex flex-center gap-1">
                                          <label class="text-mono font-semibold text-sm">
                                                 Share via email
                                          </label>
                                          <i class="ki-filled ki-information-2 text-muted-foreground text-sm">
                                          </i>
                                   </div>
                                   <div class="flex flex-center gap-2.5">
                                          <label class="kt-input">
                                                 <input type="text" value="miles.turner@gmail.com" />
                                          </label>
                                          <button class="kt-btn kt-btn-primary">
                                                 Share
                                          </button>
                                   </div>
                            </div>
                            <div class="kt-scrollable-y-auto max-h-[300px]">
                                   <div class="flex flex-col px-5 gap-3">
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-3.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Tyler Hero
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      tyler.hero@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option selected="">
                                                               Owner
                                                        </option>
                                                        <option>
                                                               Editor
                                                        </option>
                                                        <option>
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-1.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Esther Howard
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      esther.howard@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option>
                                                               Owner
                                                        </option>
                                                        <option selected="">
                                                               Editor
                                                        </option>
                                                        <option>
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                          <div class="flex items-center flex-wrap gap-2">
                                                 <div class="flex items-center grow gap-2.5">
                                                        <img alt="" class="rounded-full size-9 shrink-0"
                                                               src="assets/media/avatars/300-11.png" />
                                                        <div class="flex flex-col">
                                                               <a class="text-sm font-semibold text-mono hover:text-primary mb-px"
                                                                      href="#">
                                                                      Jacob Jones
                                                               </a>
                                                               <a class="hover:text-primary text-2sm text-secondary-foreground"
                                                                      href="#">
                                                                      jacob.jones@gmail.com
                                                               </a>
                                                        </div>
                                                 </div>
                                                 <select class="kt-select max-w-24">
                                                        <option>
                                                               Owner
                                                        </option>
                                                        <option>
                                                               Editor
                                                        </option>
                                                        <option selected="">
                                                               Viewer
                                                        </option>
                                                 </select>
                                          </div>
                                   </div>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex flex-col px-5 gap-4">
                                   <label class="text-mono font-semibold text-sm">
                                          Settings
                                   </label>
                                   <div class="flex flex-center justify-between flex-wrap gap-2">
                                          <div class="flex flex-center gap-1.5">
                                                 <i class="ki-filled ki-user text-muted-foreground">
                                                 </i>
                                                 <div
                                                        class="flex flex-center text-secondary-foreground font-medium text-xs">
                                                        Anyone at
                                                        <a class="text-xs font-medium link mx-1" href="#">
                                                               corpate
                                                        </a>
                                                        can view
                                                 </div>
                                          </div>
                                          <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
                                                 Change Access
                                          </button>
                                   </div>
                                   <div class="flex flex-center justify-between flex-wrap gap-2 mb-2.5">
                                          <div class="flex flex-center gap-1.5">
                                                 <i class="ki-filled ki-icon text-muted-foreground">
                                                 </i>
                                                 <div
                                                        class="flex flex-center text-secondary-foreground font-medium text-xs">
                                                        Anyone with link can edit
                                                 </div>
                                          </div>
                                          <button class="kt-link kt-link-sm kt-link-underlined kt-link-dashed">
                                                 Set Password
                                          </button>
                                   </div>
                                   <button class="kt-btn kt-btn-primary justify-center">
                                          Done
                                   </button>
                            </div>
                     </div>
              </div>
       </div>
       <div class="kt-modal" data-kt-modal="true" id="report_user_modal">
              <div class="kt-modal-content max-w-[500px] top-[15%]">
                     <div class="kt-modal-header">
                            <h3 class="kt-modal-title">
                                   Report User
                            </h3>
                            <button class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost shrink-0"
                                   data-kt-modal-dismiss="true">
                                   <i class="ki-filled ki-cross">
                                   </i>
                            </button>
                     </div>
                     <div class="kt-modal-body p-0">
                            <div class="p-5">
                                   <div class="grid place-items-center gap-1">
                                          <div class="flex justify-center items-center rounded-full">
                                                 <img class="rounded-full max-h-[55px] max-w-full"
                                                        src="assets/media/avatars/300-1.png" />
                                          </div>
                                          <div class="flex items-center justify-center gap-1">
                                                 <a class="hover:text-primary text-sm leading-5 font-semibold text-mono"
                                                        href="#">
                                                        Jenny Klabber
                                                 </a>
                                                 <svg class="text-primary" fill="none" height="13" viewbox="0 0 15 16"
                                                        width="13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
                                                               fill="currentColor">
                                                        </path>
                                                 </svg>
                                          </div>
                                   </div>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex flex-col gap-5 p-5">
                                   <div class="text-sm text-mono font-semibold">
                                          Let us know why you’re reporing this person
                                   </div>
                                   <div class="flex flex-col gap-3.5">
                                          <label class="kt-form-label flex items-center gap-2.5">
                                                 <input checked="" class="kt-radio radio-sm" name="report-option"
                                                        type="radio" value="1" />
                                                 <div class="flex flex-col gap-0.5">
                                                        <div class="text-sm font-semibold text-mono">
                                                               Impersonation
                                                        </div>
                                                        <div class="text-sm font-medium text-secondary-foreground">
                                                               It looks like this profile might be impersonating someone
                                                               else
                                                        </div>
                                                 </div>
                                          </label>
                                          <label class="kt-form-label flex items-center gap-2.5">
                                                 <input checked="" class="kt-radio radio-sm" name="report-option"
                                                        type="radio" value="2" />
                                                 <div class="flex flex-col gap-0.5">
                                                        <div class="text-sm font-semibold text-mono">
                                                               Spammy
                                                        </div>
                                                        <div class="text-sm font-medium text-secondary-foreground">
                                                               This person profile, comments or posts contain misleading
                                                               text
                                                        </div>
                                                 </div>
                                          </label>
                                          <label class="kt-form-label flex items-center gap-2.5">
                                                 <input checked="" class="kt-radio radio-sm" name="report-option"
                                                        type="radio" value="3" />
                                                 <div class="flex flex-col gap-0.5">
                                                        <div class="text-sm font-semibold text-mono">
                                                               Off bumble behavior
                                                        </div>
                                                        <div class="text-sm font-medium text-secondary-foreground">
                                                               This person has engaged in behavior that is abusive,
                                                               bullying
                                                        </div>
                                                 </div>
                                          </label>
                                          <label class="kt-form-label flex items-center gap-2.5">
                                                 <input checked="" class="kt-radio radio-sm" name="report-option"
                                                        type="radio" value="4" />
                                                 <div class="flex flex-col gap-0.5">
                                                        <div class="text-sm font-semibold text-mono">
                                                               Something else
                                                        </div>
                                                        <div class="text-sm font-medium text-secondary-foreground">
                                                               None of the reasons listed above are suitable
                                                        </div>
                                                 </div>
                                          </label>
                                   </div>
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="text-2sm font-medium text-center text-foreground p-5">
                                   Don't worry, your report is completely anonymous; the person you're
                                   <br />
                                   reporting will not be informed that you've submitted it
                            </div>
                            <div class="border-b border-b-border">
                            </div>
                            <div class="flex items-center gap-2.5 justify-end p-5" id="report_user_modal">
                                   <button class="kt-btn kt-btn-primary">
                                          Report this person
                                   </button>
                                   <button class="kt-btn kt-btn-outline" data-kt-modal-dismiss="true">
                                          Cancel
                                   </button>
                            </div>
                     </div>
              </div>
       </div>
       <!-- End of Page -->
       <!-- Scripts -->
       <script src="assets/js/core.bundle.js">
       </script>
       <script src="assets/vendors/ktui/ktui.min.js">
       </script>
       <script src="assets/vendors/apexcharts/apexcharts.min.js">
       </script>
       <script src="assets/js/widgets/general.js">
       </script>
       @yield(section: 'scripts')
       <!-- End of Scripts -->
</body>

</html>

