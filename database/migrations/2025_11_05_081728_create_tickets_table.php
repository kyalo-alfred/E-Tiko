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
       Schema::create('tickets', function (Blueprint $table) {
        $table->id('ticket_id');
        $table->foreignId('booking_detail_id')->constrained('booking_details', 'booking_detail_id');
        $table->string('ticket_code', 100)->unique();
        $table->enum('status', ['ISSUED', 'REDEEMED', 'CANCELLED'])->default('ISSUED');
        $table->timestamp('issued_at')->useCurrent();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
