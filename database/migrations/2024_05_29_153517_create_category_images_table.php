<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories');
            $table->string('path', 255);
            $table->string('url', 255);
            $table->string('mime', 55);
            $table->integer('size');
            $table->integer('position')->nullable();
            $table->timestamps();
        });

        DB::table('categories')
            ->chunkById(100, function (Collection $categories) {
                $categories = $categories->map(function ($p) {
                    return [
                        'category_id' => $p->id,
                        'path' => '',
                        'url' => $p->categoryimage,
                        'position' => 1,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now()
                    ];
                });

                DB::table('category_images')->insert($categories->all());

            });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('categoryimage');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {           
            $table->string('categoryimage',2000)->nullable()->after('description');
        });

        DB::table('categories')
            ->select('id')
            ->chunkById(100, function (Collection $category) {
                foreach ($category as $category) {
                    $image = DB::table('category_images')
                        ->select(['product_id', 'url', 'mime', 'size'])
                        ->where('category_id', $category->id)
                        ->first();
                    if ($image) {
                        DB::table('categories')
                            ->where('id', $image->category_id)
                            ->update([
                                'image' => $image->url,
                            ]);
                    }
                }
            });

        Schema::dropIfExists('category_images');
    }
};
