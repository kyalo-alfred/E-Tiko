<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::orderBy('user_id', 'desc')->limit(100)->get();
        
        return view('dashboard', compact('users'));
    }
}
