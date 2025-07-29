
<!DOCTYPE html>
<html class="h-full" data-kt-theme="true" data-kt-theme-mode="light" dir="ltr" lang="en">

@include('layout.head')

 <body class="antialiased flex h-full text-base text-foreground bg-background">
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
  <style>
   .branded-bg {
			background-image:url('assets/media/images/2600x1600/1.png');
		}
		.dark .branded-bg {
			background-image: url('assets/media/images/2600x1600/1-dark.png');
		}
  </style>
  <div class="grid lg:grid-cols-2 grow">
   <div class="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
    <div class="kt-card max-w-[370px] w-full">
     <form action=" {{ route('signup.store') }}" class="kt-card-content flex flex-col gap-5 p-10" id="sign_up_form" method="post">
      @csrf
      <div class="text-center mb-2.5">
       <h3 class="text-lg font-medium text-mono leading-none mb-2.5">
        Sign up
       </h3>
       <div class="flex items-center justify-center">
        <span class="text-sm text-secondary-foreground me-1.5">
         Already have an Account ?
        </span>
        <a class="text-sm link" href="/signin">
         Sign In
        </a>
       </div>
      </div>
      {{-- فاصل --}}
      <div class="flex items-center gap-2">
       <span class="border-t border-border w-full">
       </span>
      </div>

      <div class="flex flex-col gap-1">
       <label class="kt-form-label text-mono">
        Name
       </label>
       <input class="kt-input" name="name" placeholder="Enter Your Name" type="text" value=""/>
      </div>
      <div class="flex flex-col gap-1">
       <label class="kt-form-label text-mono">
        Email
       </label>
       <input class="kt-input" name="email" placeholder="email@email.com" type="text" value=""/>
      </div>
      <div class="flex flex-col gap-1">
       <label class="kt-form-label font-normal text-mono">
        Password
       </label>
       <div class="kt-input" data-kt-toggle-password="true">
        <input name="password" placeholder="Enter Password" type="password" value="">
         <button class="kt-btn kt-btn-sm kt-btn-ghost kt-btn-icon bg-transparent! -me-1.5" data-kt-toggle-password-trigger="true" type="button">
          <span class="kt-toggle-password-active:hidden">
           <i class="ki-filled ki-eye text-muted-foreground">
           </i>
          </span>
          <span class="hidden kt-toggle-password-active:block">
           <i class="ki-filled ki-eye-slash text-muted-foreground">
           </i>
          </span>
         </button>
        </input>
       </div>
      </div>
      <div class="flex flex-col gap-1">
       <label class="kt-form-label font-normal text-mono">
        Confirm Password
       </label>
       <div class="kt-input" data-kt-toggle-password="true">
        <input name="password" placeholder="Re-enter Password" type="password" value=""/>
        <button class="kt-btn kt-btn-sm kt-btn-ghost kt-btn-icon bg-transparent! -me-1.5" data-kt-toggle-password-trigger="true" type="button">
         <span class="kt-toggle-password-active:hidden">
          <i class="ki-filled ki-eye text-muted-foreground">
          </i>
         </span>
         <span class="hidden kt-toggle-password-active:block">
          <i class="ki-filled ki-eye-slash text-muted-foreground">
          </i>
         </span>
        </button>
       </div>
      </div>
      <button class="kt-btn kt-btn-primary flex justify-center grow">
       Sign up
      </button>
     </form>
    </div>
   </div>
   <div class="lg:rounded-xl lg:border lg:border-border lg:m-5 order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg">
    <div class="flex flex-col p-8 lg:p-16 gap-4">
     <a href="html/demo6.html">
      <img class="h-[28px] max-w-none" src="assets/media/app/mini-logo.svg"/>
     </a>
     <div class="flex flex-col gap-3">
      <h3 class="text-2xl font-semibold text-mono">
       Secure Access Portal
      </h3>
      <div class="text-base font-medium text-secondary-foreground">
       A robust authentication gateway ensuring
       <br/>
       secure
       <span class="text-mono font-semibold">
        efficient user access
       </span>
       to the Metronic
       <br/>
       Dashboard interface.
      </div>
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
  <!-- End of Scripts -->
 </body>
</html>
