<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClassifiedUrl extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'url',
        'final_label',
        'title',
        'description',
        'title_raw',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
