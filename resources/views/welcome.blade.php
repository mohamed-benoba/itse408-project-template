<!DOCTYPE html>
<html lang="{{ config(key: 'app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <!-- Metronic CSS -->
        <link href="{{ asset('metronic/css/style.bundle.css') }}" rel="stylesheet">
        <link href="{{ asset('metronic/plugins/global/plugins.bundle.css') }}" rel="stylesheet">

        <!-- Styles -->
        <style>
            :root {
                --kt-primary: #009ef7;
                --kt-primary-active: #0095e8;
                --kt-primary-light: #f1fa0;
                --kt-primary-inverse: #ffffff;
                --kt-gray-100: #f9f9f9;
                --kt-gray-200: #f1f1f2;
                --kt-gray-300: #e1e3ea;
                --kt-gray-400: #b5b5c3;
                --kt-gray-500: #a1a5b7;
                --kt-gray-600: #7e8299;
                --kt-gray-700: #5e6278;
                --kt-gray-800: #3f4254;
                --kt-gray-900: #181c32;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--kt-gray-900);
            }

            .welcome-container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 3rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 600px;
                width: 90%;
                margin: 2rem;
            }

            .logo {
                margin-bottom: 2rem;
            }

            .logo img {
                height: 60px;
                width: auto;
            }

            .title {
                font-size: 3rem;
                font-weight: 700;
                color: var(--kt-primary);
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--kt-primary), #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .subtitle {
                font-size: 1.2rem;
                color: var(--kt-gray-600);
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .auth-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }

            .btn {
                padding: 0.75rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }

            .btn-primary {
                background: var(--kt-primary);
                color: white;
            }

            .btn-primary:hover {
                background: var(--kt-primary-active);
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0, 158, 247, 0.3);
            }

            .btn-outline {
                background: transparent;
                color: var(--kt-primary);
                border: 2px solid var(--kt-primary);
            }

            .btn-outline:hover {
                background: var(--kt-primary);
                color: white;
                transform: translateY(-2px);
            }

            .links {
                display: flex;
                gap: 2rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 2rem;
            }

            .links a {
                color: var(--kt-gray-600);
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
                padding: 0.5rem 1rem;
                border-radius: 8px;
            }

            .links a:hover {
                color: var(--kt-primary);
                background: var(--kt-primary-light);
            }

            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin: 2rem 0;
            }

            .feature {
                padding: 1.5rem;
                background: var(--kt-gray-100);
                border-radius: 12px;
                border-left: 4px solid var(--kt-primary);
            }

            .feature h3 {
                color: var(--kt-gray-900);
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }

            .feature p {
                color: var(--kt-gray-600);
                font-size: 0.9rem;
                line-height: 1.5;
            }

            @media (max-width: 768px) {
                .welcome-container {
                    padding: 2rem;
                    margin: 1rem;
                }

                .title {
                    font-size: 2rem;
                }

                .auth-buttons {
                    flex-direction: column;
                }

                .btn {
                    width: 100%;
                    justify-content: center;
                }

                .links {
                    flex-direction: column;
                    gap: 1rem;
                }
            }

            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                .welcome-container {
                    background: rgba(30, 30, 30, 0.95);
                    color: white;
                }

                .subtitle {
                    color: var(--kt-gray-400);
                }

                .feature {
                    background: rgba(255, 255, 255, 0.05);
                }

                .feature h3 {
                    color: white;
                }

                .feature p {
                    color: var(--kt-gray-400);
                }

                .links a {
                    color: var(--kt-gray-400);
                }

                .links a:hover {
                    background: rgba(0, 158, 247, 0.1);
                }
            }
        </style>
    </head>
    <body>
        <div class="welcome-container">
            <!-- Logo -->
            <div class="logo">
                <img src="{{ asset('metronic/media/logos/default-dark.svg') }}" alt="Logo">
            </div>

            <!-- Title -->
            <h1 class="title">{{ config('app.name', 'Laravel') }}</h1>
            
            <!-- Subtitle -->
            <p class="subtitle">
                Welcome to your new Laravel application with Metronic styling. 
                Get started by creating your account or signing in.
            </p>

            <!-- Auth Buttons -->
            <div class="auth-buttons">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/dashboard') }}" class="btn btn-primary">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                            Dashboard
                        </a>
                    @else
                        <a href="{{ url('/login') }}" class="btn btn-primary">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                            Sign In
                        </a>
                        <a href="{{ url('/register') }}" class="btn btn-outline">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                            Sign Up
                        </a>
                    @endauth
                @endif
            </div>

            <!-- Features -->
            <div class="features">
                <div class="feature">
                    <h3>🚀 Fast & Modern</h3>
                    <p>Built with the latest Laravel framework and Metronic design system</p>
                </div>
                <div class="feature">
                    <h3>🎨 Beautiful UI</h3>
                    <p>Professional design with responsive layout and dark mode support</p>
                </div>
                <div class="feature">
                    <h3>🔒 Secure</h3>
                    <p>Enterprise-grade security with authentication and authorization</p>
                </div>
            </div>

            <!-- Links -->
            <div class="links">
                <a href="https://laravel.com/docs" target="_blank">Documentation</a>
                <a href="https://laracasts.com" target="_blank">Laracasts</a>
                <a href="https://laravel-news.com" target="_blank">News</a>
                <a href="https://github.com/laravel/laravel" target="_blank">GitHub</a>
            </div>
        </div>

        <!-- Metronic JS -->
        <script src="{{ asset('metronic/js/scripts.bundle.js') }}"></script>
        <script src="{{ asset('metronic/plugins/global/plugins.bundle.js') }}"></script>
    </body>
</html>