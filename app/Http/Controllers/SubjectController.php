<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Display all subjects with teachers
        $subjects = Subject::with('teacher')->get();
        $teachers = Teacher::all();
        
        // Debug information
        \Log::info('Subjects count: ' . $subjects->count());
        \Log::info('Teachers count: ' . $teachers->count());
        
        return view('subjects', compact('subjects', 'teachers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // show create form
        return view('subjects.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // save new subject
        $subject = Subject::create($request->all());
        return redirect()->route('subjects.index')->with('success', 'تمت إضافة المادة بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        // show subject details
        return view('subjects.show', compact('subject'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Return subject data for AJAX edit
        $subject = Subject::findOrFail($id);
        return response()->json($subject);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // update subject
        $subject = Subject::findOrFail($id);
        $subject->update($request->all());
        return redirect()->route('subjects.index')->with('success', 'تم تعديل المادة بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // delete subject
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return redirect()->route('subjects.index')->with('success', 'تم حذف المادة بنجاح');
    }
}
