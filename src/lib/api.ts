import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

// Exam API
export const examAPI = {
  // Get all active exams
  async getExams(filters?: {
    subject?: string;
    grade_level?: number;
    is_premium?: boolean;
  }) {
    let query = supabase
      .from('exams')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (filters?.subject) {
      query = query.eq('subject', filters.subject);
    }
    if (filters?.grade_level) {
      query = query.eq('grade_level', filters.grade_level);
    }
    if (filters?.is_premium !== undefined) {
      query = query.eq('is_premium', filters.is_premium);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get exam by ID with questions
  async getExamWithQuestions(examId: string) {
    const { data: exam, error: examError } = await supabase
      .from('exams')
      .select('*')
      .eq('id', examId)
      .single();

    if (examError) throw examError;

    const { data: questions, error: questionsError } = await supabase
      .from('exam_questions')
      .select('*')
      .eq('exam_id', examId)
      .order('order_index');

    if (questionsError) throw questionsError;

    return { exam, questions };
  },

  // Create new exam (admin only)
  async createExam(exam: TablesInsert<'exams'>) {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update exam (admin only)
  async updateExam(id: string, updates: TablesUpdate<'exams'>) {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete exam (admin only)
  async deleteExam(id: string) {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Question API
export const questionAPI = {
  // Add question to exam
  async addQuestion(question: TablesInsert<'exam_questions'>) {
    const { data, error } = await supabase
      .from('exam_questions')
      .insert(question)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update question
  async updateQuestion(id: string, updates: TablesUpdate<'exam_questions'>) {
    const { data, error } = await supabase
      .from('exam_questions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete question
  async deleteQuestion(id: string) {
    const { error } = await supabase
      .from('exam_questions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Bulk import questions
  async bulkImportQuestions(questions: TablesInsert<'exam_questions'>[]) {
    const { data, error } = await supabase
      .from('exam_questions')
      .insert(questions)
      .select();

    if (error) throw error;
    return data;
  },
};

// Exam Attempt API
export const attemptAPI = {
  // Start exam attempt
  async startAttempt(examId: string) {
    const { data, error } = await supabase
      .from('exam_attempts')
      .insert({
        exam_id: examId,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update attempt with answers
  async updateAttempt(attemptId: string, answers: any, status?: string) {
    const updates: TablesUpdate<'exam_attempts'> = {
      answers,
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updates.status = status;
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from('exam_attempts')
      .update(updates)
      .eq('id', attemptId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's exam attempts
  async getUserAttempts(userId?: string) {
    let query = supabase
      .from('exam_attempts')
      .select(`
        *,
        exams (
          title,
          subject,
          duration_minutes
        )
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Calculate and save final score
  async calculateScore(attemptId: string, answers: any, questions: any[]) {
    let correctAnswers = 0;
    
    Object.entries(answers).forEach(([questionIndex, selectedAnswer]) => {
      const question = questions[parseInt(questionIndex)];
      if (question && selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    const { data, error } = await supabase
      .from('exam_attempts')
      .update({
        score,
        correct_answers: correctAnswers,
        total_questions: questions.length,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', attemptId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// User Management API
export const userAPI = {
  // Get all users (admin only)
  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update user role (admin only)
  async updateUserRole(userId: string, role: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user statistics
  async getUserStats(userId: string) {
    const { data: attempts, error } = await supabase
      .from('exam_attempts')
      .select(`
        *,
        exams (
          subject,
          title
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (error) throw error;

    const totalAttempts = attempts?.length || 0;
    const averageScore = attempts?.length 
      ? attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / attempts.length
      : 0;

    const subjectStats = attempts?.reduce((acc, attempt) => {
      const subject = attempt.exams?.subject || 'Unknown';
      if (!acc[subject]) {
        acc[subject] = { attempts: 0, totalScore: 0, averageScore: 0 };
      }
      acc[subject].attempts++;
      acc[subject].totalScore += attempt.score || 0;
      acc[subject].averageScore = acc[subject].totalScore / acc[subject].attempts;
      return acc;
    }, {} as Record<string, any>) || {};

    return {
      totalAttempts,
      averageScore: Math.round(averageScore),
      subjectStats,
      recentAttempts: attempts?.slice(0, 5) || [],
    };
  },
};

// Payment API
export const paymentAPI = {
  // Create payment intent
  async createPayment(examId: string, amount: number) {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        exam_id: examId,
        amount,
        status: 'pending',
        currency: 'USD',
        payment_provider: 'stripe',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update payment status
  async updatePaymentStatus(paymentId: string, status: string, transactionId?: string) {
    const updates: TablesUpdate<'payments'> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (transactionId) {
      updates.transaction_id = transactionId;
    }

    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user payments
  async getUserPayments() {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        exams (
          title,
          subject
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};

// Analytics API
export const analyticsAPI = {
  // Track user event
  async trackEvent(eventType: string, eventData?: any) {
    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        event_data: eventData,
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID(),
        user_agent: navigator.userAgent,
      });

    if (error) console.error('Analytics tracking error:', error);
  },

  // Get platform statistics (admin only)
  async getPlatformStats() {
    const [
      { count: totalUsers },
      { count: totalExams },
      { count: totalAttempts },
      { data: recentActivity }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('exams').select('*', { count: 'exact', head: true }),
      supabase.from('exam_attempts').select('*', { count: 'exact', head: true }),
      supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
    ]);

    return {
      totalUsers: totalUsers || 0,
      totalExams: totalExams || 0,
      totalAttempts: totalAttempts || 0,
      recentActivity: recentActivity || [],
    };
  },
};