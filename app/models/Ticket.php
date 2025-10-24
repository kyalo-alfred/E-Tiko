<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $table = 'Tickets';
    protected $primaryKey = 'ticket_id';

    protected $fillable = [
        'booking_detail_id',
        'ticket_code',
        'status',
    ];

    protected $casts = [
        'issued_at' => 'datetime',
    ];

    public function bookingDetail()
    {
        return $this->belongsTo(BookingDetail::class, 'booking_detail_id', 'booking_detail_id');
    }

    public function attendance()
    {
        return $this->hasOne(Attendance::class, 'ticket_id', 'ticket_id');
    }
}
