import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import SEOHead from '../components/seo/SEOHead'
import journal from '../data/journal.json'

export default function Journal() {
  return (
    <>
      <SEOHead title={journal.meta.title} description={journal.meta.description} pathname="/journal" />
      <PageHero
        eyebrow="The journal"
        title="Ideas for the moments you want to keep."
        description="Guides and inspiration for planning photography sessions, celebrations, portraits, and brand stories."
      />
      <section className="pb-20">
        <p className="mb-8 border-l-2 border-amber-700 pl-4 text-sm leading-6 text-stone-600">
          Editorial samples and image references are provided as starting points. Review, personalize, and add verified author, publication, and licensed image details before publishing.
        </p>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {journal.articles.map((article) => (
            <article key={article.slug} className="group">
              <Link to={`/journal/${article.slug}`} className="block overflow-hidden bg-stone-200">
                <WatermarkedPhoto
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.025]"
                />
              </Link>
              <p className="eyebrow mt-5">{article.category}</p>
              <h2 className="editorial-serif mt-2 text-3xl leading-tight text-stone-900">
                <Link to={`/journal/${article.slug}`} className="hover:text-amber-900">{article.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{article.excerpt}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.13em] text-stone-500">
                {article.author} · {article.published}
              </p>
              <Link to={`/journal/${article.slug}`} className="text-link mt-5 inline-flex items-center gap-2">
                Read the article <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
