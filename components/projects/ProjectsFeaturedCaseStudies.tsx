import { FeaturedCaseStudy } from "@/components/projects/FeaturedCaseStudy";
import { getFeaturedProjects } from "@/lib/projects";

const DEFERRED_SHOTS_BOOTSTRAP = `(function(){var assign=function(img){var url=img.getAttribute("data-src");if(!url||img.getAttribute("src"))return;img.src=url;};var hero=document.querySelector("#projects-grid article:first-of-type img[data-deferred-shot]");if(hero){var armed=false;var armHero=function(){if(armed)return;armed=true;assign(hero);};window.addEventListener("scroll",armHero,{once:true,passive:true});window.addEventListener("touchstart",armHero,{once:true,passive:true});window.addEventListener("keydown",armHero,{once:true,passive:true});window.setTimeout(armHero,6000);}if(typeof IntersectionObserver==="undefined"){document.querySelectorAll("img[data-deferred-shot][data-src]").forEach(assign);return;}var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;var img=entry.target.querySelector("img[data-deferred-shot]");if(img)assign(img);io.unobserve(entry.target);});},{rootMargin:"0px"});document.querySelectorAll("[data-defer-shot-frame]").forEach(function(el){io.observe(el);});})();`;

export function ProjectsFeaturedCaseStudies() {
  const featured = getFeaturedProjects();

  return (
    <section
      id="projects-grid"
      aria-label="Featured projects"
      className="mb-10 flex w-full min-w-0 flex-col gap-14 md:mb-16 md:gap-20"
    >
      {featured.map((project, index) => (
        <FeaturedCaseStudy
          key={project.id}
          project={project}
          index={index}
          reverse={index % 2 === 1}
        />
      ))}
      <script dangerouslySetInnerHTML={{ __html: DEFERRED_SHOTS_BOOTSTRAP }} />
    </section>
  );
}
