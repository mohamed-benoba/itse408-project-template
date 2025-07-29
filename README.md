### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamed-benoba/itse408-project-template.git
   cd itse408-project-template
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Create MySQL DB**

   ```bash
   # Create a new MySQL database
   mysql -u root -h 127.0.0.1 -P 3306 -e "CREATE DATABASE your_database_name;"
   ```

5. **Configure database**
   Edit `.env` file and set your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed the database (optional)**
   ```bash
   php artisan db:seed
   ```

8. **Build assets**
   ```bash
   npm run build
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

10. **Access the application**
    - Open: `http://localhost:8000`
    - Default login: Check the seeder for credentials

## 🛠️ CRUD Operations Guide

### Step-by-Step CRUD Creation

Here's how to create a complete CRUD operation for any entity (e.g., "Product"):

#### 1. Create Migration
```bash
php artisan make:migration create_products_table
```

Edit the migration file:
```php
public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description')->nullable();
        $table->decimal('price', 8, 2);
        $table->integer('stock')->default(0);
        $table->boolean('is_active')->default(true);
        $table->timestamps();
    });
}
```

#### 2. Create Model
```bash
php artisan make:model Product
```

Edit the model:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
```

#### 3. Create Controller
```bash
php artisan make:controller ProductController --resource
```

Edit the controller:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(10);
        return view('products.index', compact('products'));
    }

    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
```

#### 4. Create Routes
Add to `routes/web.php`:
```php
Route::middleware('auth')->group(function () {
    Route::resource('products', ProductController::class);
});
```

#### 5. Create View
Create `resources/views/product.blade.php`:
CRUD page example: examples/students.blade.php.example

#### 6. Add to Sidebar
Add to `resources/views/layout/sidebar.blade.php`:
```blade
{{-- Products --}}
<div class="kt-menu-item">
    <a class="kt-menu-link gap-2.5 py-2 px-2.5 rounded-md border border-transparent kt-menu-item-active:border-border kt-menu-item-active:bg-background kt-menu-link-hover:bg-background kt-menu-link-hover:border-border" href="{{ route('products.index') }}">
        <span class="kt-menu-icon items-start text-lg text-secondary-foreground kt-menu-item-active:text-foreground kt-menu-item-here:text-foreground kt-menu-item-show:text-foreground kt-menu-link-hover:text-foreground dark:menu-item-active:text-mono dark:menu-item-here:text-mono dark:menu-item-show:text-mono dark:menu-link-hover:text-mono">
            <i class="fa-solid fa-box"></i>
        </span>
        <span class="kt-menu-title text-sm text-foreground font-medium kt-menu-item-here:text-mono kt-menu-item-show:text-mono kt-menu-link-hover:text-mono">
            Products
        </span>
    </a>
</div>
```

#### 7. Run Migration
```bash
php artisan migrate
```

## 🔧 Useful Commands

### Development
```bash
# Start development server
php artisan serve

# Watch for changes and rebuild assets
npm run dev

# Build for production
npm run build

# Clear all caches
php artisan optimize:clear
```

### Database
```bash
# Create migration
php artisan make:migration create_table_name

# Run migrations
php artisan migrate

# Rollback last migration
php artisan migrate:rollback

# Reset all migrations
php artisan migrate:reset

# Refresh migrations and seed
php artisan migrate:fresh --seed
```

### Models & Controllers
```bash
# Create model with migration
php artisan make:model ModelName -m

# Create controller
php artisan make:controller ControllerName

# Create resource controller
php artisan make:controller ControllerName --resource

# Create model with controller and migration
php artisan make:model ModelName -mc

# Create model with controller, migration, and seeder
php artisan make:model ModelName -mcs
```

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/    # Controllers
│   ├── Models/             # Eloquent models
│   └── Providers/          # Service providers
├── database/
│   ├── migrations/         # Database migrations
│   ├── seeders/           # Database seeders
│   └── factories/         # Model factories
├── resources/
│   ├── views/             # Blade templates
│   │   ├── layout/        # Layout files
│   │   └── auth/          # Authentication views
│   ├── css/              # Stylesheets
│   └── js/               # JavaScript files
├── routes/
│   └── web.php           # Web routes
└── public/               # Public assets
```

## 🎨 Theme Integration

This project uses the Metronic theme. Assets are located in:
- CSS: `public/metronic/css/`
- JS: `public/metronic/js/`
- Images: `public/metronic/media/`

## 🔐 Authentication

The application includes a complete authentication system:
- Login/Signup pages
- Password reset functionality
- User profile management
- Session management

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
