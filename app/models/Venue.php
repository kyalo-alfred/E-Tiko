<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    protected $table = 'Venue';
    protected $primaryKey = 'venue_id';

    protected $fillable = [
        'name',
        'address',
        'capacity',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'venue_id', 'venue_id');
    }
}
