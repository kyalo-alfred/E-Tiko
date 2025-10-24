<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:Users,email',
            'phone' => 'nullable|string|max:20|unique:Users,phone',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::createUser(
                $request->full_name,
                $request->email,
                $request->phone,
                $request->password,
                2 // Default role: Attendee
            );

            Auth::login($user);
            
            return redirect('/dashboard')->with('success', 'Registration successful!');
        } catch (\Exception $e) {
            return back()->withErrors(['email' => 'Registration failed. Please try again.']);
        }
    }
}
