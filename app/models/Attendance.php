<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'Attendance';
    protected $primaryKey = 'attendance_id';

    protected $fillable = [
        'ticket_id',
        'checked_in',
        'check_in_time',
    ];

    protected $casts = [
        'checked_in' => 'boolean',
        'check_in_time' => 'datetime',
    ];

    public $timestamps = false;

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'ticket_id');
    }
}
