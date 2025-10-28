import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, ExternalLink, Star, Plus, Search, Filter, Trash2 } from 'lucide-react';

export default function SkillUp() {
  const initialCourses = [
    {
      id: 1,
      name: "React Hooks na Prática",
      link: "https://exemplo.com/react-hooks",
      learning: "Aprendi a usar useCallback e useMemo para otimizar performance em apps complexos",
      rating: 5,
      type: "curso"
    },
    {
      id: 2,
      name: "Clean Code",
      link: "https://exemplo.com/clean-code",
      learning: "A importância de nomes significativos e funções pequenas. Código é lido 10x mais do que escrito.",
      rating: 5,
      type: "livro"
    }
  ];

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('skillup-courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    learning: '',
    rating: 5,
    type: 'curso'
  });

  useEffect(() => {
    localStorage.setItem('skillup-courses', JSON.stringify(courses));
  }, [courses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...formData
    };
    setCourses([newCourse, ...courses]);
    setFormData({ name: '', link: '', learning: '', rating: 5, type: 'curso' });
    setShowForm(false);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = searchTerm === '' || 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.learning.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterRating === 0 || course.rating >= filterRating;
      
      return matchesSearch && matchesRating;
    });
  }, [courses, searchTerm, filterRating]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="text-indigo-600" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SkillUp
            </h1>
          </div>
          <p className="text-gray-600">Catálogo de cursos e livros que mudaram minha jornada</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nome ou aprendizado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>Todas as notas</option>
                <option value={5}>⭐ 5 estrelas</option>
                <option value={4}>⭐ 4+ estrelas</option>
                <option value={3}>⭐ 3+ estrelas</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Adicionar Novo Aprendizado
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="curso"
                    checked={formData.type === 'curso'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="text-indigo-600"
                  />
                  <span className="text-gray-700">Curso</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="livro"
                    checked={formData.type === 'livro'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="text-indigo-600"
                  />
                  <span className="text-gray-700">Livro</span>
                </label>
              </div>

              <input
                type="text"
                placeholder="Nome do curso ou livro"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="url"
                placeholder="Link (https://...)"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                placeholder="O que você aprendeu? (mini resumo)"
                value={formData.learning}
                onChange={(e) => setFormData({...formData, learning: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />

              <div>
                <label className="block text-gray-700 mb-2">Nota:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({...formData, rating})}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Star
                        size={24}
                        className={rating <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.link || !formData.learning}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 mb-4">
          Mostrando {filteredCourses.length} de {courses.length} aprendizados
        </div>

        <div className="space-y-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Nenhum aprendizado encontrado</p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                        {course.type}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {course.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(course.rating)}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {course.learning}
                </p>

                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Acessar {course.type}
                  <ExternalLink size={16} />
                </a>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          💡 Aprendizado contínuo é a chave para evolução constante
        </div>
      </div>
    </div>
  );
}