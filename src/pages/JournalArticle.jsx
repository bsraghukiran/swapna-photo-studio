import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import SEOHead from '../components/seo/SEOHead'
import journal from '../data/journal.json'

export default function JournalArticle() {
  const { slug } = useParams()
  const article = journal.articles.find((item) => item.slug === slug)

  if (!article) return <NotFound />

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        pathname={`/journal/${article.slug}`}
        image={article.image}
      />
      <article className="mx-auto max-w-3xl pb-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.16em] text-stone-500">
          <Link to="/journal" className="hover:text-stone-900">Journal</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span>{article.category}</span>
        </nav>
        <header>
          <p className="eyebrow">{article.category}</p>
          <h1 className="editorial-serif mt-4 text-5xl leading-tight text-stone-900 sm:text-6xl">{article.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">{article.excerpt}</p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.13em] text-stone-500">
            {article.author} · {article.published}
          </p>
        </header>
        <WatermarkedPhoto
          src={article.image}
          alt=""
          fetchPriority="high"
          className="mt-9 h-auto w-full"
        />
        <p className="mt-5 border-l-2 border-amber-700 pl-4 text-xs leading-5 text-stone-500">
          Sample article copy — personalize and verify details before publication.
        </p>
        <div className="mt-10 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="editorial-serif text-3xl text-stone-900">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-stone-700">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-12 border-t border-stone-300 pt-6">
          <Link to="/journal" className="text-link">Back to the journal</Link>
        </div>
      </article>
    </>
  )
}
