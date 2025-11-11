<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'merchant_request_id',
        'checkout_request_id',
        'mpesa_code',
        'amount',
        'phone_number',
        'status',
    ];
}
