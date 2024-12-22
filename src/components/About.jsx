import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-xl mb-6">{personalInfo.about}</p>
          <p className="text-lg text-gray-600">{personalInfo.strengths}</p>
        </motion.div>
      </div>
    </section>
  );
}