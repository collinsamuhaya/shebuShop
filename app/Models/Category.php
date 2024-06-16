<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'description',   
        'categoryimage',
        'created_by', 
        'updated_by',
        'deleted_by'
        
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
