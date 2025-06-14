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
        Schema::create('export_audits', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->comment('操作者');
            $table->integer('product_id');
            $table->integer('quantity')->default(0);
            $table->integer('status')->default(0)->comment('0: in, 1: out');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('export_audits');
    }
};
