<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
        $table->id('user_id');
        $table->unsignedBigInteger('role_id');
        $table->string('full_name', 100);
        $table->string('email', 100)->unique();
        $table->string('phone', 20)->unique()->nullable();
        $table->string('password_hash', 255);
        $table->boolean('two_fa_enabled')->default(false);
        $table->timestamp('created_at')->useCurrent();

        $table->foreign('role_id')->references('role_id')->on('roles');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
