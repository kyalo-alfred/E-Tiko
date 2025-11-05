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
        Schema::create('booking_details', function (Blueprint $table) {
            $table->id('booking_detail_id');
            $table->foreignId('booking_id')->constrained('bookings', 'booking_id');
            $table->string('ticket_type', 50);
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_details');
    }
};
