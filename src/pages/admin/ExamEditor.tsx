import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2, ArrowLeft, Upload, Download, Eye, CreditCard as Edit } from 'lucide-react';
import { examAPI, questionAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import EthiopianHeader from '@/components/ethiopian/EthiopianHeader';

const ExamEditor = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [examForm, setExamForm] = useState({
    title: '',
    description: '',
    subject: '',
    grade_level: 12,
    duration_minutes: 60,
    pass_score: 70,
    is_active: true,
    is_premium: false,
    price: 0,
  });

  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    question_type: 'multiple_choice',
    options: ['', '', '', ''],
    correct_answer: '0',
    explanation: '',
    points: 1,
  });

  useEffect(() => {
    if (examId && examId !== 'new') {
      loadExam();
    } else {
      setLoading(false);
    }
  }, [examId]);

  const loadExam = async () => {
    try {
      const { exam, questions } = await examAPI.getExamWithQuestions(examId!);
      setExam(exam);
      setQuestions(questions);
      setExamForm({
        title: exam.title,
        description: exam.description || '',
        subject: exam.subject,
        grade_level: exam.grade_level || 12,
        duration_minutes: exam.duration_minutes || 60,
        pass_score: exam.pass_score || 70,
        is_active: exam.is_active,
        is_premium: exam.is_premium,
        price: exam.price || 0,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load exam',
        variant: 'destructive',
      });
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExam = async () => {
    setSaving(true);
    try {
      if (examId === 'new') {
        const newExam = await examAPI.createExam(examForm);
        toast({
          title: 'Success',
          description: 'Exam created successfully',
        });
        navigate(`/admin/exams/${newExam.id}`);
      } else {
        await examAPI.updateExam(examId!, examForm);
        toast({
          title: 'Success',
          description: 'Exam updated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save exam',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.question_text.trim()) {
      toast({
        title: 'Error',
        description: 'Question text is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const question = await questionAPI.addQuestion({
        ...newQuestion,
        exam_id: examId,
        order_index: questions.length,
        options: newQuestion.options.filter(opt => opt.trim()),
      });

      setQuestions([...questions, question]);
      setNewQuestion({
        question_text: '',
        question_type: 'multiple_choice',
        options: ['', '', '', ''],
        correct_answer: '0',
        explanation: '',
        points: 1,
      });

      toast({
        title: 'Success',
        description: 'Question added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add question',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await questionAPI.deleteQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
      toast({
        title: 'Success',
        description: 'Question deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete question',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <EthiopianHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {examId === 'new' ? 'Create New Exam' : 'Edit Exam'}
              </h1>
              <p className="text-muted-foreground">
                {examId === 'new' ? 'Create a new examination' : `Editing: ${exam?.title}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSaveExam} disabled={saving} className="bg-gradient-primary">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Exam'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Exam Details</TabsTrigger>
            <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Exam Details */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Exam Title</Label>
                    <Input
                      id="title"
                      value={examForm.title}
                      onChange={(e) => setExamForm({...examForm, title: e.target.value})}
                      placeholder="Enter exam title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={examForm.subject}
                      onChange={(e) => setExamForm({...examForm, subject: e.target.value})}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={examForm.description}
                    onChange={(e) => setExamForm({...examForm, description: e.target.value})}
                    placeholder="Enter exam description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade_level">Grade Level</Label>
                    <Input
                      id="grade_level"
                      type="number"
                      value={examForm.grade_level}
                      onChange={(e) => setExamForm({...examForm, grade_level: parseInt(e.target.value)})}
                      min="1"
                      max="12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={examForm.duration_minutes}
                      onChange={(e) => setExamForm({...examForm, duration_minutes: parseInt(e.target.value)})}
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pass_score">Pass Score (%)</Label>
                    <Input
                      id="pass_score"
                      type="number"
                      value={examForm.pass_score}
                      onChange={(e) => setExamForm({...examForm, pass_score: parseInt(e.target.value)})}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Management */}
          <TabsContent value="questions" className="space-y-6">
            {/* Add New Question */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question_text">Question Text</Label>
                  <Textarea
                    id="question_text"
                    value={newQuestion.question_text}
                    onChange={(e) => setNewQuestion({...newQuestion, question_text: e.target.value})}
                    placeholder="Enter the question"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-8 text-sm font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({...newQuestion, options: newOptions});
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <input
                        type="radio"
                        name="correct_answer"
                        checked={newQuestion.correct_answer === index.toString()}
                        onChange={() => setNewQuestion({...newQuestion, correct_answer: index.toString()})}
                        className="w-4 h-4"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                    placeholder="Explain the correct answer"
                    rows={2}
                  />
                </div>

                <Button onClick={handleAddQuestion} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {/* Existing Questions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Existing Questions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {questions.map((question: any, index) => (
                <Card key={question.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant="secondary">{question.question_type}</Badge>
                        </div>
                        <h4 className="font-medium">{question.question_text}</h4>
                        <div className="text-sm text-muted-foreground">
                          {question.options && (
                            <div className="space-y-1">
                              {JSON.parse(question.options).map((option: string, optIndex: number) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                                    optIndex.toString() === question.correct_answer 
                                      ? 'bg-success text-white' 
                                      : 'bg-muted'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this exam available to students
                    </p>
                  </div>
                  <Switch
                    checked={examForm.is_active}
                    onCheckedChange={(checked) => setExamForm({...examForm, is_active: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Premium Exam</Label>
                    <p className="text-sm text-muted-foreground">
                      Require payment to access this exam
                    </p>
                  </div>
                  <Switch
                    checked={examForm.is_premium}
                    onCheckedChange={(checked) => setExamForm({...examForm, is_premium: checked})}
                  />
                </div>

                {examForm.is_premium && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={examForm.price}
                      onChange={(e) => setExamForm({...examForm, price: parseFloat(e.target.value)})}
                      min="0"
                    />
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Danger Zone</h4>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Exam Permanently
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExamEditor;