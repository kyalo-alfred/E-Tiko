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
        Schema::create('payments', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('booking_id')->nullable();
        $table->string('merchant_request_id')->nullable();
        $table->string('checkout_request_id')->nullable();
        $table->string('mpesa_code')->nullable();
        $table->decimal('amount', 10, 2)->nullable();
        $table->string('phone_number')->nullable();
        $table->enum('status', ['PENDING', 'SUCCESS', 'FAILED'])->default('PENDING');
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
