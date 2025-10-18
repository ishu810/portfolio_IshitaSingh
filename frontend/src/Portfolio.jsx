import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { Github, Linkedin } from "lucide-react";
import { NavLink } from 'react-router-dom'


export default function Portfolio() {
    const socialmedia = [
        { link: "https://github.com/ishu810", logo: "/githublogo.png" },
        { link: "https://www.linkedin.com/in/ishita-singh-30624a368", logo: "/linkedin.png" },
        { link: "https://www.instagram.com/yourusername", logo: "/instalogo.png" },
        { link: "https://twitter.com/yourusername", logo: "/twiterlogo.png" },
        { link: "mailto:ishitasingh8170@gmail.com", logo: "/gmaillogo.png" },
    ];
    //************************************************** */
    const [handles] = useState({
        leetcode: "ishumaurya",
        codeforces: "ishu_singh",
        gfg: "ishitasinkn4",
    });
    const [stats, setStats] = useState({
        leetcode: null,
        codeforces: null,
        gfg: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchPlatformStats() {
        setLoading(true);
        setError(null);

        try {
            const cfRes = await fetch(
                `https://codeforces.com/api/user.info?handles=${handles.codeforces}`
            );
            const cfData = cfRes.ok ? await cfRes.json() : mockCodeforces();
            stats.codeforces = cfData.result ? cfData.result[0] : mockCodeforces();

            const urls = [
                `http://localhost:5000/api/leetcode?handle=${handles.leetcode}`,
                // `https://codeforces.com/api/user.info?handles=${handles.codeforces}`,
                // `http://localhost:5000/api/codeforces?handle=${handles.codeforces}`,
                // `http://localhost:5000/api/gfg?handle=${handles.gfg}`,
            ];

            const responses = await Promise.all(urls.map(url => fetch(url).catch(() => null)));

            const results = await Promise.all(
                responses.map(async (res, i) => {
                    if (!res) return getMock(i);
                    try {
                        const json = await res.json();
                        if (json.error) return getMock(i);
                        return json;
                    } catch {
                        return getMock(i);
                    }
                })
            );

            function getMock(index) {
                switch (index) {
                    case 0: return mockLeetCode();
                    case 1: return mockCodeforces();
                    case 2: return mockGFG();
                    default: return {};
                }
            }

            setStats({ leetcode: results[0], codeforces: stats.codeforces, gfg: mockGFG() });
        } catch (e) {
            console.error(e);
            setError("Failed to fetch platform stats. Using fallback data.");
            setStats({ leetcode: mockLeetCode(), codeforces: mockCodeforces(), gfg: mockGFG() });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlatformStats();
    }, []);

    // Mock data functions 
    function mockLeetCode() {
        return {
            solved: 820,
            easy: 420,
            medium: 350,
            hard: 50,
            acceptance: "64%",
            ranking: "—",
        };
    }
    function mockCodeforces() {
        return {
            rating: 1623,
            maxRating: 1700,
            rank: "Expert",
            problems: 340,
            color: "orange",
        };
    }
    function mockGFG() {
        return {
            problems: 450,
            practiceScore: 1200,
        };
    }
    //************************************************************************ */
    const projects = [
        {
            title: "CareSphere",
            description: "A full-stack website where user can track their medicine progress with realtime notification, authentication and chatbot.",
            tech: ["Next.js", "Socket.IO", "Tailwind", "Firebase", "HuggingFace"],
            repo: "https://github.com/ishu810/CareSphere",
            demo: "https://vimeo.com/1126413757",
        },
        {
            title: "LawyersDiary",
            description: "A interface where lawyers and their client can intrect and see their progress",
            tech: ["React", "Next.js", "Multer", "Cloudinary"],
            repo: "https://github.com/ishu810/lawyers_diary",
            demo: "https://vimeo.com/1126413757",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-1 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            {/* NAVBAR */}
            <header className="sticky top-0 z-30 bg-white/60 dark:bg-black/60 backdrop-blur-md border-b border-blue-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">IS</div>
                        <div className="font-medium">Ishita Singh</div>
                    </div>

                    <nav className="space-x-6 hidden md:flex items-center text-sm">
                        <a href="#projects" className="hover:underline">Projects</a>
                        <a href="#competitive" className="hover:underline">Competitive</a>
                        <a href="#education" className="hover:underline">Education</a>
                        <a href="#" className="hover:underline">Resume</a>
                        <a href="#contact" className="px-3 py-1 rounded-md border border-indigo-500 text-indigo-500 hover:bg-indigo-50">Contact</a>
                    </nav>

                    <div className="md:hidden">
                        <button className="p-2 rounded-md border">Menu</button>
                    </div>
                </div>
            </header>

            {/* INTRO */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <section className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-bold leading-tight">
                            Hi, I’m Ishita Singh a B.Tech student at MNNIT Allahabad.

                        </motion.h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">
                            I am specializing in Electrical engineering. Currently i am exploring web developement and data
                            structures so that combined version of it can optimize memory and time.
                            I have solved DSA questions on several platforms like leetcode, GFG, Codeforces etc. Here are some of my projects and live coding stats.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <a href="#resume" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">Download Resume</a>
                            <a href="#contact" className="inline-flex items-center px-4 py-2 border rounded-md">Contact Me</a>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {['MERN', 'C++', 'C', 'Tailwind', 'Firebase'].map((t) => (
                                <span key={t} className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 shadow-xl flex items-center justify-center">
                            {/* Placeholder for avatar / 3D model / illustration */}
                            <div className="text-center">
                                <div className="text-2xl font-semibold">Ishita</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Full-stack · Competitive Programming</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROJECTS */}
                <section id="projects" className="mt-16">
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-2"> click to view live demo of the project.</p> */}

                    <div className="mt-6 grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
                        {projects.map((p) => (
                            <motion.div whileHover={{ y: -4 }} key={p.title} className="bg-white dark:bg-blue-950 p-4 rounded-2xl shadow border">
                                <div className=" grid sm:grid-cols-1 lg:grid-cols-2 gap-6">

                                    <div className=" m-10 flex items-start justify-between h-60">
                                        <div>
                                            <h3 className="text-2xl p-4">{p.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{p.description}</p>
                                            <div className="mt-15 flex flex-wrap gap-2">
                                                {p.tech.map((t) => (
                                                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 border">{t}</span>
                                                ))}
                                            </div>
                                            <a href={p.repo} className="block text-indigo-600 p-3" target="_blank" rel="noopener noreferrer"
                                            >Code</a>
                                            <a href={p.demo} className="block text-gray-500"
                                                target="_blank" rel="noopener noreferrer" >Demo</a>
                                        </div>
                                    </div>
                                    {/* <div className="mt-10 grid sm:grid-cols-1 lg:grid-cols-2 gap-6"> */}
                                    {/* <div>
                                        <img
                                          className="flex items-start justify-between dark:bg-gray-800"
                                            src="/CareSphere"
                                            alt=""
                                        />
                                    </div> */}
                                    <div className="flex items-start justify-between dark:bg-gray-800">
                                        <div>
                                            <h3 className="font-semibold">{p.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{p.description}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {p.tech.map((t) => (
                                                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 border">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-sm text-right">
                                            <a href={p.repo} className="block text-indigo-600">Code</a>
                                            <a href={p.demo} className="block text-gray-500">Demo</a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* COMPETITIVE PROGRAMMING */}
                <section id="competitive" className="mt-16">
                    <h2 className="text-2xl font-semibold">Competitive Programming</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Live stats from popular platforms.</p>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                        {/* LeetCode Card */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">LC</div>
                                    <div>
                                        <div className="font-semibold">LeetCode</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{handles.leetcode}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-indigo-600">{loading ? 'Loading…' : ''}</div>
                            </div>

                            <div className="mt-4">
                                {stats.leetcode ? (
                                    <>
                                        <div className="text-3xl font-semibold">Solved ques:{stats.leetcode.totalSolved}</div>
                                        <div className="mt-2 text-sm text-gray-500">Solved • Acceptance {stats.leetcode.acceptanceRate}</div>

                                        <div className="mt-4">
                                            <div className="text-xs text-gray-400">Difficulty split</div>
                                            <div className="mt-2 flex gap-2 items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs">Easy</div>
                                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                                        <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${(stats.leetcode.easySolved / stats.leetcode.totalSolved) * 100}%` }} />
                                                    </div>
                                                </div>
                                                <div className="w-12 text-right text-sm">{stats.leetcode.easySolved}</div>
                                            </div>

                                            <div className="mt-2 flex gap-2 items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs">Medium</div>
                                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                                        <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${(stats.leetcode.mediumSolved / stats.leetcode.totalSolved) * 100}%` }} />
                                                    </div>
                                                </div>
                                                <div className="w-12 text-right text-sm">{stats.leetcode.mediumSolved}</div>
                                            </div>

                                            <div className="mt-2 flex gap-2 items-center">
                                                <div className="flex-1">
                                                    <div className="text-xs">Hard</div>
                                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                                        <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${(stats.leetcode.hardSolved / stats.leetcode.totalSolved) * 100}%` }} />
                                                    </div>
                                                </div>
                                                <div className="w-12 text-right text-sm">{stats.leetcode.hardSolved}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-500">No data yet — implement a backend endpoint at <code className="bg-gray-100 px-1 rounded">/api/leetcode?handle=</code></div>
                                )}
                            </div>
                        </div>

                        {/* Codeforces Card */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">CF</div>
                                    <div>
                                        <div className="font-semibold">Codeforces</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{handles.codeforces}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-indigo-600">{stats.codeforces ? stats.codeforces.rating : ''}</div>
                            </div>

                            <div className="mt-4">
                                {stats.codeforces ? (
                                    <>
                                        <div className="text-xl font-semibold">Rating {stats.codeforces.rating}-{stats.codeforces.maxRating}</div>
                                        <div className="mt-2 text-sm text-gray-500">Rank  {stats.codeforces.rank}• {stats.codeforces.maxRank}</div>

                                        <div className="mt-4">
                                            <div className="text-xs text-gray-400">Last Online</div>
                                            <div className="mt-2 text-2xl font-bold">{stats.codeforces.lastOnlineTimeSeconds}</div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-500">No data yet — implement /api/codeforces?handle=</div>
                                )}
                            </div>
                        </div>

                        {/* GFG Card */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">GfG</div>
                                    <div>
                                        <div className="font-semibold">GeeksforGeeks</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-300">{handles.gfg}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-indigo-600">{stats.gfg ? stats.gfg.practiceScore : ''}</div>
                            </div>

                            <div className="mt-4">
                                {stats.gfg ? (
                                    <>
                                        <div className="text-2xl font-bold">{stats.gfg.problems}</div>
                                        <div className="mt-2 text-sm text-gray-500">Problems solved</div>
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-500">No data yet — implement /api/gfg?handle=</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* EDUCATION */}
                <section id="education" className="mt-16">
                    <h2 className="text-2xl font-semibold">Education</h2>
                    <div className="mt-6 space-y-4">
                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">B.Tech in Electrical Engineering</div>
                                    <div className="text-sm text-gray-500">Motilala Neharu National Institute of technology— 2024 — 2028</div>
                                </div>
                                <div className="text-sm font-medium">CPI: 7.98(till 2nd sem)</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Relevant coursework: Data Structures, Algorithms, Operating System.</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">12th in PCM stream </div>
                                    <div className="text-sm text-gray-500">Jawahar Navodaya Vidyalaya (Sonebhadra)- 2023</div>
                                </div>
                                <div className="text-sm font-medium">Percentage: 92%</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Relevant coursework: Physics, Chemistry , Maths</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">10th in Science stream</div>
                                    <div className="text-sm text-gray-500">Jawahar Navodaya Vidyalaya (Sonebhadra)- 2021</div>
                                </div>
                                <div className="text-sm font-medium">Percentage: 92.2%</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Relevant coursework: Science , Maths, social studies</div>
                        </div>
                    </div>
                </section>
                {/* RESUME */}
                {/* <section id="resume" className="mt-16">
                    <h2 className="text-2xl font-semibold">Resume</h2>
                    <div className="mt-4 p-6 rounded-2xl bg-white dark:bg-gray-800 border shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-300">You can embed your PDF here or provide a download link.</p>
                        <div className="mt-4 flex gap-3">
                            <a href="/resume.pdf" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Download Resume (PDF)</a>
                            <a href="/resume.pdf#view=fit" className="px-4 py-2 border rounded-md">Preview</a>
                        </div>
                    </div>
                </section> */}

                {/* CONTACT */}
                <section id="contact" className="mt-16 mb-24">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                        <form className="p-6 bg-white dark:bg-gray-800 rounded-2xl border shadow">
                            <label className="block text-sm">Name</label>
                            <input className="w-full mt-2 p-2 rounded-md bg-gray-50 dark:bg-gray-900 border" placeholder="Your name" />

                            <label className="block text-sm mt-4">Email</label>
                            <input className="w-full mt-2 p-2 rounded-md bg-gray-50 dark:bg-gray-900 border" placeholder="you@example.com" />

                            <label className="block text-sm mt-4">Message</label>
                            <textarea className="w-full mt-2 p-2 rounded-md bg-gray-50 dark:bg-gray-900 border" rows={5} placeholder="Let's build something..."></textarea>

                            <div className="mt-4">
                                <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Send</button>
                            </div>
                        </form>

                        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border shadow">
                            <h3 className="font-semibold">Get in touch</h3>
                            <p className="text-sm text-gray-500 mt-2">Connect on LinkedIn, GitHub or send an email.</p>
                            <div className="mt-4 flex gap-3">
                                {socialmedia.map((sm, index) => (
                                    <a
                                        key={index}
                                        href={sm.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 border rounded-md hover:bg-blue-700 hover:text-white transition"
                                    >
                                        <img
                                            src={sm.logo}
                                            alt=""
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
                <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Ishita Singh. Built with React + Tailwind.</div>
            </footer>
        </div>
    );
}
