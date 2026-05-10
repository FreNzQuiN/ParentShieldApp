<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->ulid('log_id')->primary();
            $table->foreignId('parent_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->string('url');
            $table->string('web_title')->nullable();
            $table->text('web_description')->nullable();
            $table->string('detail_url')->nullable();
            $table->boolean('grant_access')->nullable();
            $table->string('classified_final_label')->nullable();
            $table->string('classified_title')->nullable();
            $table->text('classified_description')->nullable();
            $table->string('classified_title_raw')->nullable();
            $table->timestamps();

            $table->index(['parent_id', 'child_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
