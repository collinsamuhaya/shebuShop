<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryImage extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'category_id',
        'path',
        'url',
        'position',
    ];

    public function category()
    {
        return $this->belongsTo(category::class);
    }

}
