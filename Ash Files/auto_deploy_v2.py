import os
import subprocess
import time

# Configuration
base_dir = r"c:\Users\Admin\Desktop\Ashraf Morningstar\Project Graveyard\Ash Files"

projects = {
    "01-Beginner-Projects/01-ChronoCard": ("ChronoCard", "Time reimagined. A premium, glassmorphic digital clock interface that transforms how you perceive time. Minimalist, elegant, and viral-ready."),
    "01-Beginner-Projects/02-MoodScroll": ("MoodScroll", "Emotion in motion. An infinite scroll experience that adapts to your mood. Featuring liquid smooth animations and a responsive, high-end UI."),
    "01-Beginner-Projects/03-SilentNav": ("SilentNav", "Navigation perfected. A stealthy, non-intrusive sidebar navigation system inspired by futuristic dashboards. Ultra-clean code and silky transitions."),
    "01-Beginner-Projects/04-PersonaTiles": ("PersonaTiles", "Identity grid. A dynamic, interactive user profile showcase using masonry layouts and hover-triggered reveals. The ultimate portfolio component."),
    "01-Beginner-Projects/05-AmbientLanding": ("AmbientLanding", "Immersive entry. A landing page that breathes. Subtle parallax effects, atmospheric audio integration, and deep, resonant visuals."),
    "01-Beginner-Projects/06-404Museum": ("404Museum", "Lost functionality found. A 404 error page styled as a high-art museum exhibit. Turn user frustration into delight with this interactive masterpiece."),
    "02-Environment-Projects/07-ThemeSmith": ("ThemeSmith", "The fabric of reality. A powerful theming engine allowing real-time CSS variable manipulation. Dark, light, and everything in between."),
    "02-Environment-Projects/08-WindowedWeb": ("WindowedWeb", "Desktop in the cloud. A web-based window manager mimicking a premium OS environment. Drag, drop, and embrace productivity."),
    "02-Environment-Projects/09-EchoForms": ("EchoForms", "Input evolved. Conversational form interfaces that feel like chatting. High-conversion design with micro-interactions for every keystroke."),
    "02-Environment-Projects/10-DataVeil": ("DataVeil", "Privacy visualized. A dashboard for data obscurantism and security visualization. Cyberpunk aesthetics meet enterprise-grade layouts."),
    "02-Environment-Projects/11-MotionGrammar": ("MotionGrammar", "Language of movement. A physics-based animation library showcase. Bounce, spring, and decay your way to a living coded interface."),
    "02-Environment-Projects/12-OfflineRitual": ("OfflineRitual", "Disconnected zen. An offline-first PWA designed for focus and deep work. Syncs when you're back, serene when you're not."),
    "03-Expert-Projects/13-BrowserOSLite": ("BrowserOSLite", "The web is the OS. A lightweight operating system simulation running entirely in your browser. File systems, apps, and window management."),
    "03-Expert-Projects/14-Timefold": ("Timefold", "Temporal architecture. A project management tool that folds time into usable chunks. 4D visualization of your productivity timeline."),
    "03-Expert-Projects/15-NeuralUI": ("NeuralUI", "Brain-computer interface style. A UI kit inspired by neural networks and AI data flows. Connecting nodes, pulsing synapses, and futuristic data vis."),
    "03-Expert-Projects/16-AtlasWeb": ("AtlasWeb", "Global interconnection. A 3D WebGL globe interface for visualizing geospatial data. High-performance, interactive, and visually stunning."),
    "03-Expert-Projects/17-Sentinel": ("Sentinel", "Watchful eye. A security monitoring dashboard with real-time graphs, alerts, and distinct 'command center' vibes. Dark mode default."),
    "03-Expert-Projects/18-GhostPortfolio": ("GhostPortfolio", "Invisible assets. A cryptocurrency and asset tracker with privacy focus. Minimalist numbers, maximum insight. The shadow finance tool.")
}

def deploy_project(rel_path, name, desc):
    full_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(full_path):
        print(f"❌ Path not found: {rel_path}")
        return

    print(f"\n[{name}] Processing...")

    # 1. Ensure Git State
    try:
        # Check current branch
        branch = subprocess.run(["git", "branch", "--show-current"], cwd=full_path, capture_output=True, text=True).stdout.strip()
        if not branch:
            branch = "master" # Fallback
        
        # Add and commit any leftover changes
        subprocess.run(["git", "add", "."], cwd=full_path, capture_output=True)
        status = subprocess.run(["git", "status", "--porcelain"], cwd=full_path, capture_output=True, text=True)
        if status.stdout.strip():
             subprocess.run(["git", "commit", "-m", "Final Polish: Prepared for Viral Launch"], cwd=full_path, capture_output=True)
             print(f"   ✓ Committed changes on {branch}")
    except Exception as e:
        print(f"   ❌ Git Local Error: {e}")
        return

    # 2. Create Repo
    try:
        check = subprocess.run(["gh", "repo", "view", f"AshrafMorningstar/{name}"], capture_output=True)
        if check.returncode != 0:
            print(f"   Creating GitHub repo...")
            subprocess.run([
                "gh", "repo", "create", f"AshrafMorningstar/{name}",
                "--public",
                "--description", desc,
                "--homepage", f"https://ashrafmorningstar.github.io/{name}"
            ], check=True, capture_output=True)
            print("   ✓ Repo created via CLI")
        else:
            print("   ✓ Repo already exists")
    except subprocess.CalledProcessError as e:
        print(f"   ⚠️ Repo creation issue: {e}")

    # 3. Push
    try:
        remote_url = f"https://github.com/AshrafMorningstar/{name}.git"
        subprocess.run(["git", "remote", "remove", "origin"], cwd=full_path, capture_output=True)
        subprocess.run(["git", "remote", "add", "origin", remote_url], cwd=full_path, check=True)
        
        print(f"   Pushing {branch}...")
        push = subprocess.run(["git", "push", "-u", "origin", branch, "--force"], cwd=full_path, capture_output=True, text=True)
        
        if push.returncode == 0:
            print(f"   ✅ DEPLOYED: {remote_url}")
        else:
            print(f"   ❌ Push Failed. Stderr: {push.stderr[:200]}") # Truncate error
            
    except Exception as e:
        print(f"   ❌ Push Error: {e}")

def main():
    print("--- Starting Robust Deployment ---")
    for path, (name, desc) in projects.items():
        deploy_project(path, name, desc)
    print("\n--- All Done ---")

if __name__ == "__main__":
    main()
