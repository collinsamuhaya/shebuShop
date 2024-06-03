<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string(column:'name',length:255);
            $table->longText(column:'description')->nullable();
            $table->string(column:'categoryimage', length:2000)->nullable();
            $table->foreignIdFor(model:User::class,column:'created_by')->nullable();
            $table->foreignIdFor(model:User::class,column:'updated_by')->nullable();
            $table->softDeletes();
            $table->foreignIdFor(model:User::class,column:'deleted_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
