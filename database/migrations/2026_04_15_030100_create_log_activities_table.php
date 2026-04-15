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
        Schema::create('log_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('child_id')->constrained('children')->cascadeOnDelete();
            $table->foreignId('parent_id')->constrained('users')->cascadeOnDelete();
            $table->text('url');
            $table->string('web_title')->nullable();
            $table->text('web_description')->nullable();
            $table->text('detail_url')->nullable();
            $table->boolean('grant_access')->nullable();
            $table->timestamps();

            $table->index(['child_id', 'created_at']);
            $table->index(['parent_id', 'created_at']);
            $table->index('grant_access');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_activities');
    }
};
