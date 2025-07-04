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
        Schema::create('stock_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->integer('user_id')->comment('発送先担当者');
            $table->integer('quantity')->default(0);
            $table->integer('status')->default(0)->comment('0: in, 1: out');
            $table->string('related_link')->nullable();
            $table->text('memo')->nullable();
            $table->integer('progress')->default(0)->comment('1: 緊急, 2: 完了, 3: 進行中');
            $table->dateTime('shipping_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_logs');
    }
};
