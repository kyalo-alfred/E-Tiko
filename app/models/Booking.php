<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'Bookings';
    protected $primaryKey = 'booking_id';

    protected $fillable = [
        'user_id',
        'event_id',
        'status',
    ];

    protected $casts = [
        'booking_date' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    public function bookingDetails()
    {
        return $this->hasMany(BookingDetail::class, 'booking_id', 'booking_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'booking_id', 'booking_id');
    }

    // Static method from your original Booking model
    public static function allWithDetails(int $limit = 1000): \Illuminate\Database\Eloquent\Collection
    {
        return static::with(['user', 'event'])
            ->orderBy('booking_id', 'desc')
            ->limit($limit)
            ->get();
    }
}
