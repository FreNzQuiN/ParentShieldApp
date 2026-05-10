<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Log extends Model
{
    use HasFactory, HasUlids;

    protected $primaryKey = 'log_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'parent_id',
        'child_id',
        'url',
        'web_title',
        'web_description',
        'detail_url',
        'grant_access',
        'classified_final_label',
        'classified_title',
        'classified_description',
        'classified_title_raw',
    ];

    protected $casts = [
        'grant_access' => 'boolean',
    ];

    public function child()
    {
        return $this->belongsTo(Child::class, 'child_id');
    }

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
}
