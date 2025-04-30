<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class ContentController extends Controller
{
    public function index()
    {
        $contents = Content::with(['user', 'comments.user'])
            ->withCount('likes')
            ->latest()
            ->get();
            
        return response()->json($contents);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $content = Content::create([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'user_id' => Auth::id(),
        ]);

        return response()->json($content, 201);
    }

    public function show(Content $content)
    {
        $content->load(['user', 'comments.user'])->loadCount('likes');
        
        return response()->json($content);
    }

    public function update(Request $request, Content $content)
    {
        // Check if the user is authorized to update the content
        if ($content->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $content->update($validated);

        return response()->json($content);
    }

    public function destroy(Content $content)
    {
        // Check if the user is authorized to delete the content
        if ($content->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $content->delete();

        return response()->json(['message' => 'Content deleted successfully']);
    }

    public function like(Content $content)
    {
        $user = Auth::user();
        $like = Like::where('user_id', $user->id)
                    ->where('content_id', $content->id)
                    ->first();
                    
        if ($like) {
            $like->delete();
            $message = 'Content unliked successfully';
        } else {
            Like::create([
                'user_id' => $user->id,
                'content_id' => $content->id,
            ]);
            $message = 'Content liked successfully';
        }

        return response()->json([
            'message' => $message,
            'likes_count' => $content->likes()->count(),
        ]);
    }

    public function addComment(Request $request, Content $content)
    {
        $validated = $request->validate([
            'comment' => 'required|string',
        ]);

        $comment = Comment::create([
            'comment' => $validated['comment'],
            'user_id' => Auth::id(),
            'content_id' => $content->id,
        ]);

        $comment->load('user');

        return response()->json($comment, 201);
    }
}