<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    protected $table = 'BookingDetails';
    protected $primaryKey = 'booking_detail_id';

    protected $fillable = [
        'booking_id',
        'ticket_type',
        'price',
        'quantity',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public $timestamps = false;

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'booking_detail_id', 'booking_detail_id');
    }
}
