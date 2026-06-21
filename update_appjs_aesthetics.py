import os

path = r"f:/TURNIODEV_PROMAX_DIVIDEO/static/app.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# -----------------------------------------------------------------------------
# 1. Update Template: slide_view_8b
# -----------------------------------------------------------------------------
old_template_8b = """                  else if (slideId === 'slide_view_8b') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:space-between; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; margin-top:5px;">
                                   <span style="font-size:11px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:4px 16px; border-radius:20px;">
                                       BƯỚC 1: BĂM ID & TUNG ĐỒNG XU (HASHING)
                                   </span>
                               </div>
                               
                               <div class="users-container" style="display:flex; justify-content:center; gap:16px; width:100%; height:320px; z-index:2; margin-top:20px; padding:0 10px; box-sizing:border-box;">
                                   <!-- Card 1 -->
                                   <div class="user-card glass-card u-card-0" style="width:150px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:15px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center;">
                                       <div style="width:40px; height:40px; border-radius:50%; background:rgba(59,130,246,0.1); border:1.5px solid rgba(59,130,246,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#3b82f6; width:20px; height:20px;"></i>
                                       </div>
                                       <div style="font-size:11px; font-weight:bold; color:#fff; margin-bottom:5px;">user_3918</div>
                                       <div class="coin-spin" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:2.5px solid #fff; box-shadow:0 0 15px rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:10px;">
                                           <div style="font-size:7.5px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Mã băm nhị phân</div>
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:10px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; letter-spacing:0.5px; word-break:break-all;"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">00</span><span class="normal-bits" style="opacity:0;">110101...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:3px 8px; font-size:10px; color:#10b981; font-weight:bold; margin-top:10px; opacity:0; transform:scale(0.8); transition:all 0.4s;">
                                           Số số 0 ở đầu: <span style="font-size:12px; font-weight:900;">2</span>
                                       </div>
                                   </div>
                                   <!-- Card 2 -->
                                   <div class="user-card glass-card u-card-1" style="width:150px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:15px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center;">
                                       <div style="width:40px; height:40px; border-radius:50%; background:rgba(168,85,247,0.1); border:1.5px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#a855f7; width:20px; height:20px;"></i>
                                       </div>
                                       <div style="font-size:11px; font-weight:bold; color:#fff; margin-bottom:5px;">user_8421</div>
                                       <div class="coin-spin" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:2.5px solid #fff; box-shadow:0 0 15px rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:10px;">
                                           <div style="font-size:7.5px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Mã băm nhị phân</div>
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:10px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; letter-spacing:0.5px; word-break:break-all;"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">0000</span><span class="normal-bits" style="opacity:0;">1011...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:3px 8px; font-size:10px; color:#10b981; font-weight:bold; margin-top:10px; opacity:0; transform:scale(0.8); transition:all 0.4s;">
                                           Số số 0 ở đầu: <span style="font-size:12px; font-weight:900;">4</span>
                                       </div>
                                   </div>
                                   <!-- Card 3 -->
                                   <div class="user-card glass-card u-card-2" style="width:150px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:15px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center;">
                                       <div style="width:40px; height:40px; border-radius:50%; background:rgba(236,72,153,0.1); border:1.5px solid rgba(236,72,153,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#ec4899; width:20px; height:20px;"></i>
                                       </div>
                                       <div style="font-size:11px; font-weight:bold; color:#fff; margin-bottom:5px;">user_1034</div>
                                       <div class="coin-spin" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:2.5px solid #fff; box-shadow:0 0 15px rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:10px;">
                                           <div style="font-size:7.5px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Mã băm nhị phân</div>
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:10px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; letter-spacing:0.5px; word-break:break-all;"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">0</span><span class="normal-bits" style="opacity:0;">1100111...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:3px 8px; font-size:10px; color:#10b981; font-weight:bold; margin-top:10px; opacity:0; transform:scale(0.8); transition:all 0.4s;">
                                           Số số 0 ở đầu: <span style="font-size:12px; font-weight:900;">1</span>
                                       </div>
                                   </div>
                                   <!-- Card 4 -->
                                   <div class="user-card glass-card u-card-3" style="width:150px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:15px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center;">
                                       <div style="width:40px; height:40px; border-radius:50%; background:rgba(20,184,166,0.1); border:1.5px solid rgba(20,184,166,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#14b8a6; width:20px; height:20px;"></i>
                                       </div>
                                       <div style="font-size:11px; font-weight:bold; color:#fff; margin-bottom:5px;">user_6653</div>
                                       <div class="coin-spin" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:2.5px solid #fff; box-shadow:0 0 15px rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:10px;">
                                           <div style="font-size:7.5px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Mã băm nhị phân</div>
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:10px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; letter-spacing:0.5px; word-break:break-all;"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">00000</span><span class="normal-bits" style="opacity:0;">110...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:3px 8px; font-size:10px; color:#10b981; font-weight:bold; margin-top:10px; opacity:0; transform:scale(0.8); transition:all 0.4s;">
                                           Số số 0 ở đầu: <span style="font-size:12px; font-weight:900;">5</span>
                                       </div>
                                   </div>
                                   <!-- Card 5 -->
                                   <div class="user-card glass-card u-card-4" style="width:150px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:20px; padding:15px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center;">
                                       <div style="width:40px; height:40px; border-radius:50%; background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#f59e0b; width:20px; height:20px;"></i>
                                       </div>
                                       <div style="font-size:11px; font-weight:bold; color:#fff; margin-bottom:5px;">user_9927</div>
                                       <div class="coin-spin" style="width:44px; height:44px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:2.5px solid #fff; box-shadow:0 0 15px rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:13px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:10px;">
                                           <div style="font-size:7.5px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Mã băm nhị phân</div>
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:10px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.3); padding:4px; border-radius:6px; letter-spacing:0.5px; word-break:break-all;"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits"></span><span class="normal-bits" style="opacity:0;">10110100...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:3px 8px; font-size:10px; color:#10b981; font-weight:bold; margin-top:10px; opacity:0; transform:scale(0.8); transition:all 0.4s;">
                                           Số số 0 ở đầu: <span style="font-size:12px; font-weight:900;">0</span>
                                       </div>
                                   </div>
                               </div>
                               
                               <div style="position:absolute; left:30px; top:425px; width:840px; display:flex; justify-content:space-between; gap:15px; z-index:2;">
                                   <div style="flex:1; background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                                       <span style="font-size:11px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Cơ chế:</span>
                                       <span style="font-size:12px; font-weight:900; color:var(--gold-primary);">User ID ➡️ Băm nhị phân (0 và 1)</span>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

new_template_8b = """                  else if (slideId === 'slide_view_8b') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; position:absolute; top:15px;">
                                   <span style="font-size:13px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:6px 20px; border-radius:20px; letter-spacing:0.5px;">
                                       BƯỚC 1: BĂM ID & TUNG ĐỒNG XU (HASHING)
                                   </span>
                               </div>
                               
                               <div class="users-container" style="display:flex; justify-content:center; align-items:center; gap:22px; width:100%; height:380px; z-index:2; margin-top:25px; padding:0 10px; box-sizing:border-box;">
                                   <!-- Card 1 -->
                                   <div class="user-card glass-card u-card-0" style="width:160px; height:340px; border:2px solid rgba(255,255,255,0.08); border-radius:24px; padding:20px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="width:48px; height:48px; border-radius:50%; background:rgba(59,130,246,0.15); border:2px solid rgba(59,130,246,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#3b82f6; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:13px; font-weight:bold; color:#fff; margin-bottom:5px;">user_3918</div>
                                       <div class="coin-spin" style="width:58px; height:58px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:3px solid #fff; box-shadow:0 0 20px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:5px; align-items:center;">
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:13px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.45); padding:6px 12px; border-radius:8px; letter-spacing:0.8px; width:90%; border:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">00</span><span class="normal-bits" style="opacity:0;">110101...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.35); border-radius:10px; padding:6px 12px; font-size:12px; color:#10b981; font-weight:bold; margin-top:5px; opacity:0; transform:scale(0.8); transition:all 0.4s; width:80%;">
                                           Số 0 đầu: <span style="font-size:14px; font-weight:900;">2</span>
                                       </div>
                                   </div>
                                   <!-- Card 2 -->
                                   <div class="user-card glass-card u-card-1" style="width:160px; height:340px; border:2px solid rgba(255,255,255,0.08); border-radius:24px; padding:20px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="width:48px; height:48px; border-radius:50%; background:rgba(168,85,247,0.15); border:2px solid rgba(168,85,247,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#a855f7; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:13px; font-weight:bold; color:#fff; margin-bottom:5px;">user_8421</div>
                                       <div class="coin-spin" style="width:58px; height:58px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:3px solid #fff; box-shadow:0 0 20px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:5px; align-items:center;">
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:13px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.45); padding:6px 12px; border-radius:8px; letter-spacing:0.8px; width:90%; border:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">0000</span><span class="normal-bits" style="opacity:0;">1011...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.35); border-radius:10px; padding:6px 12px; font-size:12px; color:#10b981; font-weight:bold; margin-top:5px; opacity:0; transform:scale(0.8); transition:all 0.4s; width:80%;">
                                           Số 0 đầu: <span style="font-size:14px; font-weight:900;">4</span>
                                       </div>
                                   </div>
                                   <!-- Card 3 -->
                                   <div class="user-card glass-card u-card-2" style="width:160px; height:340px; border:2px solid rgba(255,255,255,0.08); border-radius:24px; padding:20px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="width:48px; height:48px; border-radius:50%; background:rgba(236,72,153,0.15); border:2px solid rgba(236,72,153,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#ec4899; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:13px; font-weight:bold; color:#fff; margin-bottom:5px;">user_1034</div>
                                       <div class="coin-spin" style="width:58px; height:58px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:3px solid #fff; box-shadow:0 0 20px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:5px; align-items:center;">
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:13px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.45); padding:6px 12px; border-radius:8px; letter-spacing:0.8px; width:90%; border:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">0</span><span class="normal-bits" style="opacity:0;">1100111...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.35); border-radius:10px; padding:6px 12px; font-size:12px; color:#10b981; font-weight:bold; margin-top:5px; opacity:0; transform:scale(0.8); transition:all 0.4s; width:80%;">
                                           Số 0 đầu: <span style="font-size:14px; font-weight:900;">1</span>
                                       </div>
                                   </div>
                                   <!-- Card 4 -->
                                   <div class="user-card glass-card u-card-3" style="width:160px; height:340px; border:2px solid rgba(255,255,255,0.08); border-radius:24px; padding:20px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="width:48px; height:48px; border-radius:50%; background:rgba(20,184,166,0.15); border:2px solid rgba(20,184,166,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#14b8a6; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:13px; font-weight:bold; color:#fff; margin-bottom:5px;">user_6653</div>
                                       <div class="coin-spin" style="width:58px; height:58px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:3px solid #fff; box-shadow:0 0 20px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:5px; align-items:center;">
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:13px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.45); padding:6px 12px; border-radius:8px; letter-spacing:0.8px; width:90%; border:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits">00000</span><span class="normal-bits" style="opacity:0;">110...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.35); border-radius:10px; padding:6px 12px; font-size:12px; color:#10b981; font-weight:bold; margin-top:5px; opacity:0; transform:scale(0.8); transition:all 0.4s; width:80%;">
                                           Số 0 đầu: <span style="font-size:14px; font-weight:900;">5</span>
                                       </div>
                                   </div>
                                   <!-- Card 5 -->
                                   <div class="user-card glass-card u-card-4" style="width:160px; height:340px; border:2px solid rgba(255,255,255,0.08); border-radius:24px; padding:20px 10px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="width:48px; height:48px; border-radius:50%; background:rgba(245,158,11,0.15); border:2px solid rgba(245,158,11,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:5px;">
                                           <i data-lucide="user" style="color:#f59e0b; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:13px; font-weight:bold; color:#fff; margin-bottom:5px;">user_9927</div>
                                       <div class="coin-spin" style="width:58px; height:58px; border-radius:50%; background:radial-gradient(circle, #fbbf24 0%, #d97706 100%); border:3px solid #fff; box-shadow:0 0 20px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px; color:#fff; font-family:var(--font-mono); transition:all 0.4s ease;">$</div>
                                       <div style="width:100%; display:flex; flex-direction:column; gap:4px; margin-top:5px; align-items:center;">
                                           <div class="hash-bits" style="font-family:var(--font-mono); font-size:13px; color:rgba(255,255,255,0.4); background:rgba(0,0,0,0.45); padding:6px 12px; border-radius:8px; letter-spacing:0.8px; width:90%; border:1px solid rgba(255,255,255,0.05);"><span style="color:#10b981; font-weight:900; opacity:0;" class="green-bits"></span><span class="normal-bits" style="opacity:0;">10110100...</span></div>
                                       </div>
                                       <div class="zero-count-badge" style="background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.35); border-radius:10px; padding:6px 12px; font-size:12px; color:#10b981; font-weight:bold; margin-top:5px; opacity:0; transform:scale(0.8); transition:all 0.4s; width:80%;">
                                           Số 0 đầu: <span style="font-size:14px; font-weight:900;">0</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

content = content.replace(old_template_8b, new_template_8b)
print("[+] Slide 8b template updated")

# -----------------------------------------------------------------------------
# 2. Update Template: slide_view_8c
# -----------------------------------------------------------------------------
old_template_8c = """                  else if (slideId === 'slide_view_8c') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:space-between; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; margin-top:5px;">
                                   <span style="font-size:11px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:4px 16px; border-radius:20px;">
                                       BƯỚC 2: QUÉT SỐ 0 ĐẦU TIÊN & TÌM KỶ LỤC
                                   </span>
                               </div>
                               
                               <!-- Smaller User Cards Row -->
                               <div class="users-row-s2" style="display:flex; justify-content:center; gap:12px; width:100%; z-index:2; margin-top:15px;">
                                   <!-- User 1 -->
                                   <div class="user-card-s2 glass-card uc-s2-0" style="width:140px; padding:10px; text-align:center; border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s ease;">
                                       <div style="font-size:10px; color:var(--text-muted); font-weight:bold;">user_3918</div>
                                       <div style="font-family:var(--font-mono); font-size:11px; color:#fff; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px; margin:5px 0;"><span style="color:#10b981; font-weight:900;">00</span>110101...</div>
                                       <div style="font-size:9.5px; font-weight:bold; color:#10b981;">Số 0: 2</div>
                                   </div>
                                   <!-- User 2 -->
                                   <div class="user-card-s2 glass-card uc-s2-1" style="width:140px; padding:10px; text-align:center; border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s ease;">
                                       <div style="font-size:10px; color:var(--text-muted); font-weight:bold;">user_8421</div>
                                       <div style="font-family:var(--font-mono); font-size:11px; color:#fff; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px; margin:5px 0;"><span style="color:#10b981; font-weight:900;">0000</span>1011...</div>
                                       <div style="font-size:9.5px; font-weight:bold; color:#10b981;">Số 0: 4</div>
                                   </div>
                                   <!-- User 3 -->
                                   <div class="user-card-s2 glass-card uc-s2-2" style="width:140px; padding:10px; text-align:center; border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s ease;">
                                       <div style="font-size:10px; color:var(--text-muted); font-weight:bold;">user_1034</div>
                                       <div style="font-family:var(--font-mono); font-size:11px; color:#fff; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px; margin:5px 0;"><span style="color:#10b981; font-weight:900;">0</span>1100111...</div>
                                       <div style="font-size:9.5px; font-weight:bold; color:#10b981;">Số 0: 1</div>
                                   </div>
                                   <!-- User 4 -->
                                   <div class="user-card-s2 glass-card uc-s2-3" style="width:140px; padding:10px; text-align:center; border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s ease;">
                                       <div style="font-size:10px; color:var(--text-muted); font-weight:bold;">user_6653</div>
                                       <div style="font-family:var(--font-mono); font-size:11px; color:#fff; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px; margin:5px 0;"><span style="color:#10b981; font-weight:900;">00000</span>110...</div>
                                       <div style="font-size:9.5px; font-weight:bold; color:#10b981;">Số 0: 5</div>
                                   </div>
                                   <!-- User 5 -->
                                   <div class="user-card-s2 glass-card uc-s2-4" style="width:140px; padding:10px; text-align:center; border:1.5px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s ease;">
                                       <div style="font-size:10px; color:var(--text-muted); font-weight:bold;">user_9927</div>
                                       <div style="font-family:var(--font-mono); font-size:11px; color:#fff; background:rgba(0,0,0,0.3); padding:3px; border-radius:4px; margin:5px 0;">10110100...</div>
                                       <div style="font-size:9.5px; font-weight:bold; color:#10b981;">Số 0: 0</div>
                                   </div>
                               </div>
                               
                               <!-- Central Record Display Card -->
                               <div class="record-board-container" style="display:flex; justify-content:center; align-items:center; flex-grow:1; margin-top:20px; z-index:2;">
                                   <div class="record-board glass-card" style="width:400px; height:180px; border:2.5px solid #fbbf24; border-radius:24px; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center; box-shadow:0 15px 35px rgba(245,158,11,0.15); animation: pulseGold 2.5s infinite;">
                                       <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:bold; color:#fbbf24; text-transform:uppercase; letter-spacing:1px;">
                                           <i data-lucide="trophy" style="color:#fbbf24; width:18px; height:18px;"></i>
                                           KỶ LỤC LỚN NHẤT (MAX RECORD)
                                       </div>
                                       
                                       <div class="record-display-val" style="font-family:var(--font-mono); font-size:46px; font-weight:900; color:#fbbf24; text-shadow:0 0 20px rgba(245,158,11,0.5); margin:10px 0;">
                                           Max = 0
                                       </div>
                                       
                                       <div class="record-status-txt" style="font-size:11px; color:var(--text-muted); font-weight:bold;">
                                           Đang quét các lượt băm...
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- Scanner beam element -->
                               <div class="scanner-beam" style="position:absolute; top:70px; left:50px; width:4px; height:60px; background:linear-gradient(to bottom, transparent, #10b981, transparent); box-shadow:0 0 12px #10b981; opacity:0; pointer-events:none; z-index:5;"></div>
 
                               <div style="position:absolute; left:30px; top:425px; width:840px; display:flex; justify-content:space-between; gap:15px; z-index:2;">
                                   <div style="flex:1; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                                       <span style="font-size:11px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Quy trình:</span>
                                       <span style="font-size:12px; font-weight:900; color:#10b981;">Tìm người có chuỗi số 0 ở đầu dài nhất làm kỷ lục mới</span>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

new_template_8c = """                  else if (slideId === 'slide_view_8c') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; position:absolute; top:15px;">
                                   <span style="font-size:13px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:6px 20px; border-radius:20px; letter-spacing:0.5px;">
                                       BƯỚC 2: QUÉT SỐ 0 ĐẦU TIÊN & TÌM KỶ LỤC
                                   </span>
                               </div>
                               
                               <!-- Smaller User Cards Row -->
                               <div class="users-row-s2" style="display:flex; justify-content:center; gap:18px; width:100%; z-index:2; margin-top:35px;">
                                   <!-- User 1 -->
                                   <div class="user-card-s2 glass-card uc-s2-0" style="width:150px; padding:14px; text-align:center; border:2px solid rgba(255,255,255,0.08); border-radius:20px; transition:all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; color:var(--text-muted); font-weight:bold; margin-bottom:5px;">user_3918</div>
                                       <div style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.45); padding:6px; border-radius:6px; margin:6px 0; border:1px solid rgba(255,255,255,0.05); font-weight:bold;"><span style="color:#10b981; font-weight:900;">00</span>110101...</div>
                                       <div style="font-size:12px; font-weight:bold; color:#10b981;">Số 0: 2</div>
                                   </div>
                                   <!-- User 2 -->
                                   <div class="user-card-s2 glass-card uc-s2-1" style="width:150px; padding:14px; text-align:center; border:2px solid rgba(255,255,255,0.08); border-radius:20px; transition:all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; color:var(--text-muted); font-weight:bold; margin-bottom:5px;">user_8421</div>
                                       <div style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.45); padding:6px; border-radius:6px; margin:6px 0; border:1px solid rgba(255,255,255,0.05); font-weight:bold;"><span style="color:#10b981; font-weight:900;">0000</span>1011...</div>
                                       <div style="font-size:12px; font-weight:bold; color:#10b981;">Số 0: 4</div>
                                   </div>
                                   <!-- User 3 -->
                                   <div class="user-card-s2 glass-card uc-s2-2" style="width:150px; padding:14px; text-align:center; border:2px solid rgba(255,255,255,0.08); border-radius:20px; transition:all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; color:var(--text-muted); font-weight:bold; margin-bottom:5px;">user_1034</div>
                                       <div style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.45); padding:6px; border-radius:6px; margin:6px 0; border:1px solid rgba(255,255,255,0.05); font-weight:bold;"><span style="color:#10b981; font-weight:900;">0</span>1100111...</div>
                                       <div style="font-size:12px; font-weight:bold; color:#10b981;">Số 0: 1</div>
                                   </div>
                                   <!-- User 4 -->
                                   <div class="user-card-s2 glass-card uc-s2-3" style="width:150px; padding:14px; text-align:center; border:2px solid rgba(255,255,255,0.08); border-radius:20px; transition:all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; color:var(--text-muted); font-weight:bold; margin-bottom:5px;">user_6653</div>
                                       <div style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.45); padding:6px; border-radius:6px; margin:6px 0; border:1px solid rgba(255,255,255,0.05); font-weight:bold;"><span style="color:#10b981; font-weight:900;">00000</span>110...</div>
                                       <div style="font-size:12px; font-weight:bold; color:#10b981;">Số 0: 5</div>
                                   </div>
                                   <!-- User 5 -->
                                   <div class="user-card-s2 glass-card uc-s2-4" style="width:150px; padding:14px; text-align:center; border:2px solid rgba(255,255,255,0.08); border-radius:20px; transition:all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; color:var(--text-muted); font-weight:bold; margin-bottom:5px;">user_9927</div>
                                       <div style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.45); padding:6px; border-radius:6px; margin:6px 0; border:1px solid rgba(255,255,255,0.05); font-weight:bold;">10110100...</div>
                                       <div style="font-size:12px; font-weight:bold; color:#10b981;">Số 0: 0</div>
                                   </div>
                               </div>
                               
                               <!-- Central Record Display Card -->
                               <div class="record-board-container" style="display:flex; justify-content:center; align-items:center; margin-top:35px; z-index:2; width:100%;">
                                   <div class="record-board glass-card" style="width:520px; height:180px; border:2.5px solid #fbbf24; border-radius:28px; padding:20px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center; box-shadow:0 15px 40px rgba(245,158,11,0.25); animation: pulseGold 2.5s infinite;">
                                       <div style="display:flex; align-items:center; gap:12px; font-size:15px; font-weight:bold; color:#fbbf24; text-transform:uppercase; letter-spacing:1.5px;">
                                           <i data-lucide="trophy" style="color:#fbbf24; width:28px; height:28px;"></i>
                                           KỶ LỤC LỚN NHẤT (MAX RECORD)
                                       </div>
                                       
                                       <div class="record-display-val" style="font-family:var(--font-mono); font-size:56px; font-weight:900; color:#fbbf24; text-shadow:0 0 25px rgba(245,158,11,0.7); margin:5px 0;">
                                           Max = 0
                                       </div>
                                       
                                       <div class="record-status-txt" style="font-size:13px; color:var(--text-muted); font-weight:bold;">
                                           Đang quét các lượt băm...
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- Scanner beam element aligned exactly to small cards' binary strings height -->
                               <div class="scanner-beam" style="position:absolute; top:88px; left:50px; width:4px; height:34px; background:linear-gradient(to bottom, transparent, #10b981, transparent); box-shadow:0 0 12px #10b981; opacity:0; pointer-events:none; z-index:5;"></div>
                           </div>
                      `;
                  }"""

content = content.replace(old_template_8c, new_template_8c)
print("[+] Slide 8c template updated")

# -----------------------------------------------------------------------------
# 3. Update Template: slide_view_8d
# -----------------------------------------------------------------------------
old_template_8d = """                  else if (slideId === 'slide_view_8d') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:space-between; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; margin-top:5px;">
                                   <span style="font-size:11px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:4px 16px; border-radius:20px;">
                                       BƯỚC 3: GÔM VÀO NHIỀU GIỎ CHỨA (REGISTERS)
                                   </span>
                               </div>
                               
                               <!-- Top Hash Routing Node -->
                               <div style="display:flex; justify-content:center; align-items:center; width:100%; margin-top:15px; z-index:2;">
                                   <div class="router-node glass-card" style="width:500px; height:90px; border:2px solid #3b82f6; border-radius:18px; padding:10px 20px; box-sizing:border-box; display:flex; justify-content:space-between; align-items:center; gap:15px;">
                                       <div style="display:flex; align-items:center; gap:8px;">
                                           <div style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
                                               <i data-lucide="shuffle" style="color:#3b82f6; width:18px; height:18px;"></i>
                                           </div>
                                           <div style="text-align:left;">
                                               <div class="router-user-id" style="font-size:12px; font-weight:bold; color:#fff;">user_3918</div>
                                               <div style="font-size:8px; color:var(--text-muted); text-transform:uppercase; font-weight:bold;">Mã băm nhị phân</div>
                                           </div>
                                       </div>
                                       <div class="router-binary-box" style="font-family:var(--font-mono); font-size:13px; color:#fff; background:rgba(0,0,0,0.4); padding:6px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); letter-spacing:1px;">
                                           <span class="router-bits-prefix" style="color:#fbbf24; font-weight:900;">0101</span><span class="router-bits-suffix" style="color:#10b981;">00110101...</span>
                                       </div>
                                       <div style="text-align:right; font-size:10px; font-weight:bold; color:#fbbf24; border-left:1px solid rgba(255,255,255,0.08); padding-left:15px;">
                                           <div class="router-target-bucket">Vào Giỏ #1</div>
                                           <div class="router-target-val" style="color:#10b981;">Kỷ lục = 3</div>
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- Connection SVG area -->
                               <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                   <path class="route-line-s3" d="M 450 160 Q 450 210 250 260" fill="none" stroke="rgba(59,130,246,0.15)" stroke-width="2.5" stroke-dasharray="6 4" />
                               </svg>
                               
                               <!-- Packet dot -->
                               <div class="route-packet-s3" style="position:absolute; width:10px; height:10px; border-radius:50%; background:#fbbf24; box-shadow:0 0 10px #fbbf24; z-index:10; left:450px; top:160px; transform:translate(-50%,-50%); opacity:0;"></div>
 
                               <!-- Bottom Registers Grid -->
                               <div style="display:flex; flex-direction:column; align-items:center; width:100%; z-index:2; margin-top:10px;">
                                   <div style="font-size:10px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">Bảng Thanh ghi HyperLogLog (16 Giỏ chứa)</div>
                                   <div class="registers-grid-s3" style="width:100%; max-width:820px; display:grid; grid-template-columns:repeat(8, 1fr); gap:6px; background:rgba(0,0,0,0.3); border:1.5px solid rgba(255,255,255,0.06); border-radius:18px; padding:10px; box-sizing:border-box;">
                                       <!-- 16 registers -->
                                       <div class="reg-box-s3 r-s3-0" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #0</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-1" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #1</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-2" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #2</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-3" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #3</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">4</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-4" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #4</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-5" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #5</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">3</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-6" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #6</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-7" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #7</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       
                                       <div class="reg-box-s3 r-s3-8" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #8</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-9" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #9</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">5</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-10" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #10</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-11" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #11</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-12" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #12</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-13" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #13</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">3</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-14" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #14</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-15" style="height:55px; border:1px solid rgba(255,255,255,0.05); background:rgba(255,255,255,0.02); border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; transition:all 0.3s ease;">
                                           <span style="font-size:8px; color:var(--text-muted); font-weight:bold;">GIỎ #15</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:14px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                   </div>
                               </div>
 
                               <div style="position:absolute; left:30px; top:425px; width:840px; display:flex; justify-content:space-between; gap:15px; z-index:2;">
                                   <div style="flex:1; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.15); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                                       <span style="font-size:11px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Cơ chế phân giỏ:</span>
                                       <span style="font-size:12px; font-weight:900; color:#3b82f6;">X bit đầu của mã băm xác định giỏ ➡️ Giảm nhiễu thống kê</span>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

new_template_8d = """                  else if (slideId === 'slide_view_8d') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; position:absolute; top:15px;">
                                   <span style="font-size:13px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:6px 20px; border-radius:20px; letter-spacing:0.5px;">
                                       BƯỚC 3: GÔM VÀO NHIỀU GIỎ CHỨA (REGISTERS)
                                   </span>
                               </div>
                               
                               <!-- Top Hash Routing Node -->
                               <div style="display:flex; justify-content:center; align-items:center; width:100%; margin-top:35px; z-index:2;">
                                   <div class="router-node glass-card" style="width:600px; height:100px; border:2px solid #3b82f6; border-radius:24px; padding:15px 30px; box-sizing:border-box; display:flex; justify-content:space-between; align-items:center; gap:20px; box-shadow: 0 10px 30px rgba(59,130,246,0.15);">
                                       <div style="display:flex; align-items:center; gap:12px;">
                                           <div style="background:rgba(59,130,246,0.15); border:1.5px solid rgba(59,130,246,0.4); border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
                                               <i data-lucide="shuffle" style="color:#3b82f6; width:22px; height:22px;"></i>
                                           </div>
                                           <div style="text-align:left;">
                                               <div class="router-user-id" style="font-size:14px; font-weight:bold; color:#fff; margin-bottom:2px;">user_3918</div>
                                           </div>
                                       </div>
                                       <div class="router-binary-box" style="font-family:var(--font-mono); font-size:15px; color:#fff; background:rgba(0,0,0,0.55); padding:8px 18px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); letter-spacing:1.2px; font-weight:bold;">
                                           <span class="router-bits-prefix" style="color:#fbbf24; font-weight:900;">0101</span><span class="router-bits-suffix" style="color:#10b981;">00110101...</span>
                                       </div>
                                       <div style="text-align:right; font-size:12px; font-weight:bold; color:#fbbf24; border-left:2px solid rgba(255,255,255,0.08); padding-left:20px; line-height:1.35;">
                                           <div class="router-target-bucket" style="font-size:13px; font-weight:900;">Vào Giỏ #1</div>
                                           <div class="router-target-val" style="color:#10b981; font-weight:900; margin-top:2px;">Kỷ lục = 3</div>
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- Connection SVG area -->
                               <svg style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;">
                                   <path class="route-line-s3" d="M 450 160 Q 450 210 250 260" fill="none" stroke="rgba(59,130,246,0.2)" stroke-width="3" stroke-dasharray="8 6" />
                               </svg>
                               
                               <!-- Packet dot -->
                               <div class="route-packet-s3" style="position:absolute; width:12px; height:12px; border-radius:50%; background:#fbbf24; box-shadow:0 0 12px #fbbf24; z-index:10; left:450px; top:160px; transform:translate(-50%,-50%); opacity:0;"></div>
 
                               <!-- Bottom Registers Grid -->
                               <div style="display:flex; flex-direction:column; align-items:center; width:100%; z-index:2; margin-top:35px;">
                                   <div style="font-size:12px; font-weight:bold; color:var(--text-muted); text-transform:uppercase; margin-bottom:10px; letter-spacing:0.8px;">Bảng Thanh ghi HyperLogLog (16 Giỏ chứa)</div>
                                   <div class="registers-grid-s3" style="width:100%; max-width:840px; display:grid; grid-template-columns:repeat(8, 1fr); gap:8px; background:rgba(0,0,0,0.35); border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:15px; box-sizing:border-box;">
                                       <!-- 16 registers -->
                                       <div class="reg-box-s3 r-s3-0" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #0</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-1" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #1</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-2" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #2</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-3" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #3</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">4</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-4" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #4</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-5" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #5</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">3</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-6" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #6</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-7" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #7</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       
                                       <div class="reg-box-s3 r-s3-8" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #8</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-9" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #9</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">5</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-10" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #10</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-11" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #11</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-12" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #12</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">0</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-13" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #13</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">3</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-14" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #14</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">2</span>
                                       </div>
                                       <div class="reg-box-s3 r-s3-15" style="height:65px; border:1.5px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; transition:all 0.3s ease;">
                                           <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">GIỎ #15</span>
                                           <span class="reg-val-s3" style="font-family:var(--font-mono); font-size:18px; color:#fff; font-weight:900;">1</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

content = content.replace(old_template_8d, new_template_8d)
print("[+] Slide 8d template updated")

# -----------------------------------------------------------------------------
# 4. Update Template: slide_view_8e
# -----------------------------------------------------------------------------
old_template_8e = """                  else if (slideId === 'slide_view_8e') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:space-between; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; margin-top:5px;">
                                   <span style="font-size:11px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:4px 16px; border-radius:20px;">
                                       BƯỚC 4: TÍNH TOÁN VIEW CÔNG CHIẾU
                                   </span>
                               </div>
                               
                               <div style="display:flex; justify-content:space-between; align-items:center; width:100%; height:320px; z-index:2; margin-top:20px; padding:0 20px; box-sizing:border-box;">
                                   <!-- Left: Small registers representation -->
                                   <div class="registers-preview glass-card" style="width:320px; height:100%; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:18px 12px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
                                       <div style="font-size:11px; font-weight:bold; color:#fff; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; text-align:center;">
                                           Thống kê các giỏ (m = 16)
                                       </div>
                                       <div class="grid-preview-s4" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; flex-grow:1; margin-top:10px; align-content:center;">
                                           <!-- 16 registers small -->
                                           <div class="r-s4-0" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#0</span><span class="rv-s4">2</span>
                                           </div>
                                           <div class="r-s4-1" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#1</span><span class="rv-s4">1</span>
                                           </div>
                                           <div class="r-s4-2" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#2</span><span class="rv-s4">0</span>
                                           </div>
                                           <div class="r-s4-3" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#3</span><span class="rv-s4">4</span>
                                           </div>
                                           
                                           <div class="r-s4-4" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#4</span><span class="rv-s4">0</span>
                                           </div>
                                           <div class="r-s4-5" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#5</span><span class="rv-s4">3</span>
                                           </div>
                                           <div class="r-s4-6" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#6</span><span class="rv-s4">1</span>
                                           </div>
                                           <div class="r-s4-7" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#7</span><span class="rv-s4">2</span>
                                           </div>
                                           
                                           <div class="r-s4-8" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#8</span><span class="rv-s4">0</span>
                                           </div>
                                           <div class="r-s4-9" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#9</span><span class="rv-s4">5</span>
                                           </div>
                                           <div class="r-s4-10" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#10</span><span class="rv-s4">1</span>
                                           </div>
                                           <div class="r-s4-11" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#11</span><span class="rv-s4">2</span>
                                           </div>
                                           
                                           <div class="r-s4-12" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#12</span><span class="rv-s4">0</span>
                                           </div>
                                           <div class="r-s4-13" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#13</span><span class="rv-s4">3</span>
                                           </div>
                                           <div class="r-s4-14" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#14</span><span class="rv-s4">2</span>
                                           </div>
                                           <div class="r-s4-15" style="background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:6px; font-family:var(--font-mono); font-size:10px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px;">
                                               <span style="font-size:7px; color:var(--text-muted);">#15</span><span class="rv-s4">1</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <!-- Center arrow / flow connection -->
                                   <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:60px;">
                                       <i data-lucide="calculator" style="color:#fbbf24; width:28px; height:28px; animation: floatAnimYt 3s ease-in-out infinite;"></i>
                                       <i data-lucide="arrow-right" style="color:var(--text-muted); width:20px; height:20px; margin-top:10px;"></i>
                                   </div>
                                   
                                   <!-- Right: HLL Formula and View estimation board -->
                                   <div class="calculator-panel glass-card" style="width:440px; height:100%; border:2.5px solid #10b981; border-radius:24px; padding:18px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 10px 30px rgba(16,185,129,0.05);">
                                       <!-- Formula -->
                                       <div style="background:rgba(0,0,0,0.3); border-radius:12px; border:1px solid rgba(16,185,129,0.2); padding:10px; text-align:center;">
                                           <div style="font-size:9.5px; color:#10b981; font-weight:bold; text-transform:uppercase; margin-bottom:4px;">Công thức HyperLogLog</div>
                                           <div style="font-family:var(--font-mono); font-size:18px; font-weight:900; color:#fff; letter-spacing:0.5px;">
                                               E = <span style="color:#fbbf24;">α_m</span> · <span style="color:#3b82f6;">m²</span> · <span style="color:#a855f7;">( Σ 2⁻ᴿⱼ )⁻¹</span>
                                           </div>
                                       </div>
                                       
                                       <!-- Result Display -->
                                       <div style="text-align:center; margin:10px 0;">
                                           <div style="font-size:10px; color:var(--text-muted); font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;">Ước tính lượt xem công chiếu</div>
                                           <div class="hll-final-view" style="font-family:var(--font-mono); font-size:42px; font-weight:900; color:#10b981; text-shadow:0 0 20px rgba(16,185,129,0.4);">
                                               0
                                           </div>
                                       </div>
                                       
                                       <!-- Comparison bar -->
                                       <div style="display:flex; justify-content:space-between; gap:10px; font-size:10px; font-weight:bold; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
                                           <div style="flex:1; background:rgba(255,255,255,0.02); border-radius:8px; padding:6px; text-align:center;">
                                               <div style="color:var(--text-muted);">VIEW THẬT</div>
                                               <div class="hll-real-view" style="color:#fff; font-size:12px; font-family:var(--font-mono); margin-top:2px;">106,000</div>
                                           </div>
                                           <div style="flex:1; background:rgba(16,185,129,0.08); border-radius:8px; padding:6px; text-align:center;">
                                               <div style="color:#10b981;">SAI SỐ THỰC TẾ</div>
                                               <div style="color:#10b981; font-size:12px; font-family:var(--font-mono); margin-top:2px;">-0.79%</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               
                               <div style="position:absolute; left:30px; top:425px; width:840px; display:flex; justify-content:space-between; gap:15px; z-index:2;">
                                   <div style="flex:1; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.15); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                                       <span style="font-size:11px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Ước tính toán học:</span>
                                       <span style="font-size:12px; font-weight:900; color:#10b981;">Trung bình điều hòa (Harmonic Mean) giúp loại bỏ nhiễu cực trị cực hiệu quả</span>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

new_template_8e = """                  else if (slideId === 'slide_view_8e') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; position:absolute; top:15px;">
                                   <span style="font-size:13px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:6px 20px; border-radius:20px; letter-spacing:0.5px;">
                                       BƯỚC 4: TÍNH TOÁN VIEW CÔNG CHIẾU
                                   </span>
                               </div>
                               
                               <div style="display:flex; justify-content:space-between; align-items:center; width:100%; height:340px; z-index:2; margin-top:30px; padding:0 10px; box-sizing:border-box;">
                                   <!-- Left: Small registers representation -->
                                   <div class="registers-preview glass-card" style="width:340px; height:100%; border:2px solid rgba(255,255,255,0.08); border-radius:28px; padding:20px 15px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                                       <div style="font-size:12px; font-weight:bold; color:#fff; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; text-align:center; letter-spacing:0.5px;">
                                           Thống kê các giỏ (m = 16)
                                       </div>
                                       <div class="grid-preview-s4" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; flex-grow:1; margin-top:15px; align-content:center;">
                                           <!-- 16 registers small -->
                                           <div class="r-s4-0" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#0</span><span class="rv-s4" style="font-weight:900; color:#10b981;">2</span>
                                           </div>
                                           <div class="r-s4-1" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#1</span><span class="rv-s4" style="font-weight:900; color:#10b981;">1</span>
                                           </div>
                                           <div class="r-s4-2" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#2</span><span class="rv-s4" style="font-weight:900; color:#10b981;">0</span>
                                           </div>
                                           <div class="r-s4-3" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#3</span><span class="rv-s4" style="font-weight:900; color:#10b981;">4</span>
                                           </div>
                                           
                                           <div class="r-s4-4" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#4</span><span class="rv-s4" style="font-weight:900; color:#10b981;">0</span>
                                           </div>
                                           <div class="r-s4-5" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#5</span><span class="rv-s4" style="font-weight:900; color:#10b981;">3</span>
                                           </div>
                                           <div class="r-s4-6" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#6</span><span class="rv-s4" style="font-weight:900; color:#10b981;">1</span>
                                           </div>
                                           <div class="r-s4-7" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#7</span><span class="rv-s4" style="font-weight:900; color:#10b981;">2</span>
                                           </div>
                                           
                                           <div class="r-s4-8" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#8</span><span class="rv-s4" style="font-weight:900; color:#10b981;">0</span>
                                           </div>
                                           <div class="r-s4-9" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#9</span><span class="rv-s4" style="font-weight:900; color:#10b981;">5</span>
                                           </div>
                                           <div class="r-s4-10" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#10</span><span class="rv-s4" style="font-weight:900; color:#10b981;">1</span>
                                           </div>
                                           <div class="r-s4-11" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#11</span><span class="rv-s4" style="font-weight:900; color:#10b981;">2</span>
                                           </div>
                                           
                                           <div class="r-s4-12" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#12</span><span class="rv-s4" style="font-weight:900; color:#10b981;">0</span>
                                           </div>
                                           <div class="r-s4-13" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#13</span><span class="rv-s4" style="font-weight:900; color:#10b981;">3</span>
                                           </div>
                                           <div class="r-s4-14" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#14</span><span class="rv-s4" style="font-weight:900; color:#10b981;">2</span>
                                           </div>
                                           <div class="r-s4-15" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-family:var(--font-mono); font-size:12px; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:52px;">
                                               <span style="font-size:9px; color:var(--text-muted); font-weight:bold;">#15</span><span class="rv-s4" style="font-weight:900; color:#10b981;">1</span>
                                           </div>
                                       </div>
                                   </div>
                                   
                                   <!-- Center arrow / flow connection -->
                                   <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:60px;">
                                       <i data-lucide="calculator" style="color:#fbbf24; width:32px; height:32px; animation: floatAnimYt 3s ease-in-out infinite;"></i>
                                       <i data-lucide="arrow-right" style="color:var(--text-muted); width:24px; height:24px; margin-top:10px;"></i>
                                   </div>
                                   
                                   <!-- Right: HLL Formula and View estimation board -->
                                   <div class="calculator-panel glass-card" style="width:480px; height:100%; border:2.5px solid #10b981; border-radius:28px; padding:22px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 15px 40px rgba(16,185,129,0.15);">
                                       <!-- Formula -->
                                       <div style="background:rgba(0,0,0,0.35); border-radius:16px; border:1.5px solid rgba(16,185,129,0.25); padding:12px; text-align:center;">
                                           <div style="font-size:11px; color:#10b981; font-weight:bold; text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">Công thức HyperLogLog</div>
                                           <div style="font-family:var(--font-mono); font-size:22px; font-weight:900; color:#fff; letter-spacing:0.8px;">
                                               E = <span style="color:#fbbf24;">α_m</span> · <span style="color:#3b82f6;">m²</span> · <span style="color:#a855f7;">( Σ 2⁻ᴿⱼ )⁻¹</span>
                                           </div>
                                       </div>
                                       
                                       <!-- Result Display -->
                                       <div style="text-align:center; margin:15px 0;">
                                           <div style="font-size:12px; color:var(--text-muted); font-weight:bold; text-transform:uppercase; letter-spacing:0.8px;">Ước tính lượt xem công chiếu</div>
                                           <div class="hll-final-view" style="font-family:var(--font-mono); font-size:52px; font-weight:900; color:#10b981; text-shadow:0 0 25px rgba(16,185,129,0.65); margin:5px 0;">
                                               0
                                           </div>
                                       </div>
                                       
                                       <!-- Comparison bar -->
                                       <div style="display:flex; justify-content:space-between; gap:12px; font-size:11px; font-weight:bold; border-top:2px solid rgba(255,255,255,0.08); padding-top:12px; width:100%;">
                                           <div style="flex:1; background:rgba(255,255,255,0.02); border-radius:10px; padding:8px; text-align:center; border:1px solid rgba(255,255,255,0.05);">
                                               <div style="color:var(--text-muted);">VIEW THẬT</div>
                                               <div class="hll-real-view" style="color:#fff; font-size:14px; font-family:var(--font-mono); margin-top:2px;">106,000</div>
                                           </div>
                                           <div style="flex:1; background:rgba(16,185,129,0.1); border-radius:10px; padding:8px; text-align:center; border:1px solid rgba(16,185,129,0.2);">
                                               <div style="color:#10b981;">SAI SỐ THỰC TẾ</div>
                                               <div style="color:#10b981; font-size:14px; font-family:var(--font-mono); margin-top:2px;">-0.79%</div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

content = content.replace(old_template_8e, new_template_8e)
print("[+] Slide 8e template updated")

# -----------------------------------------------------------------------------
# 5. Update Template: slide_view_8f
# -----------------------------------------------------------------------------
old_template_8f = """                  else if (slideId === 'slide_view_8f') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:space-between; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; margin-top:5px;">
                                   <span style="font-size:11px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:4px 16px; border-radius:20px;">
                                       ỨNG DỤNG THỰC TẾ TRONG BIG TECH
                                   </span>
                               </div>
                               
                               <div style="display:flex; justify-content:center; gap:25px; flex-grow:1; margin-top:20px; z-index:2;">
                                   <!-- Left: Google Analytics Card -->
                                   <div class="tech-card glass-card gc-ga" style="width:360px; height:220px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:22px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease;">
                                       <div style="background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.3); border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center;">
                                           <i data-lucide="bar-chart-3" style="color:#f59e0b; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:16px; font-weight:bold; color:#fff;">Google Analytics</div>
                                       <div style="font-size:11px; color:var(--text-muted); line-height:1.5; margin-top:6px;">
                                           Đếm số lượng người dùng hoạt động đồng thời (Active Users) trong thời gian thực trên hàng triệu website toàn cầu.
                                       </div>
                                   </div>
                                   
                                   <!-- Right: YouTube Real-time Card -->
                                   <div class="tech-card glass-card gc-yt" style="width:360px; height:220px; border:2px solid rgba(255,255,255,0.06); border-radius:24px; padding:22px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease;">
                                       <div style="background:rgba(239,68,68,0.1); border:1.5px solid rgba(239,68,68,0.3); border-radius:50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center;">
                                           <i data-lucide="youtube" style="color:#ef4444; width:24px; height:24px;"></i>
                                       </div>
                                       <div style="font-size:16px; font-weight:bold; color:#fff;">YouTube Real-time</div>
                                       <div style="font-size:11px; color:var(--text-muted); line-height:1.5; margin-top:6px;">
                                           Đếm lượt xem công chiếu (Live View) của hàng triệu người xem đồng thời mà không làm sập hay quá tải cơ sở dữ liệu.
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- CTA Banner -->
                               <div class="cta-banner-s5 glass-card" style="width:100%; border:1.5px solid rgba(6,182,212,0.25); background:rgba(6,182,212,0.05); border-radius:18px; padding:12px 20px; box-sizing:border-box; display:flex; justify-content:space-between; align-items:center; gap:15px; z-index:2; margin-bottom:20px;">
                                   <div style="text-align:left;">
                                       <div style="font-size:11px; font-weight:bold; color:#06b6d4; text-transform:uppercase; letter-spacing:0.5px;">Bạn muốn hiểu sâu hơn về HyperLogLog?</div>
                                       <div style="font-size:9.5px; color:var(--text-muted); margin-top:2px;">Nhấn Like hoặc Follow để ủng hộ mình ra tiếp video giải thích chi tiết code của thuật toán nhé!</div>
                                   </div>
                                   <div style="display:flex; gap:10px;">
                                       <button style="background:rgba(236,72,153,0.15); border:1px solid #ec4899; color:#ec4899; font-size:10px; font-weight:bold; padding:6px 14px; border-radius:10px; display:flex; align-items:center; gap:4px; cursor:pointer;"><i data-lucide="heart" style="width:12px; height:12px; fill:#ec4899;"></i> Thả Tim</button>
                                       <button style="background:rgba(59,130,246,0.15); border:1px solid #3b82f6; color:#3b82f6; font-size:10px; font-weight:bold; padding:6px 14px; border-radius:10px; display:flex; align-items:center; gap:4px; cursor:pointer;"><i data-lucide="bell" style="width:12px; height:12px; fill:#3b82f6;"></i> Follow</button>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

new_template_8f = """                  else if (slideId === 'slide_view_8f') {
                      viewportRoot.innerHTML = `
                           <div style="width:100%; height:100%; box-sizing:border-box; position:relative; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:var(--font-sans);">
                               <div style="text-align:center; z-index:2; position:absolute; top:15px;">
                                   <span style="font-size:13px; font-weight:bold; color:var(--gold-primary); background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); padding:6px 20px; border-radius:20px; letter-spacing:0.5px;">
                                       ỨNG DỤNG THỰC TẾ TRONG BIG TECH
                                   </span>
                               </div>
                               
                               <div style="display:flex; justify-content:center; gap:35px; width:100%; margin-top:35px; z-index:2; box-sizing:border-box; padding:0 20px;">
                                   <!-- Left: Google Analytics Card -->
                                   <div class="tech-card glass-card gc-ga" style="width:400px; height:240px; border:2px solid rgba(255,255,255,0.08); border-radius:28px; padding:25px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="background:rgba(245,158,11,0.15); border:2px solid rgba(245,158,11,0.4); border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 15px rgba(245,158,11,0.25);">
                                           <!-- High-quality Custom SVG for Bar Chart -->
                                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                       </div>
                                       <div style="font-size:18px; font-weight:bold; color:#fff;">Google Analytics</div>
                                       <div style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-top:6px;">
                                           Đếm số lượng người dùng hoạt động đồng thời (Active Users) trong thời gian thực trên hàng triệu website toàn cầu.
                                       </div>
                                   </div>
                                   
                                   <!-- Right: YouTube Real-time Card -->
                                   <div class="tech-card glass-card gc-yt" style="width:400px; height:240px; border:2px solid rgba(255,255,255,0.08); border-radius:28px; padding:25px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:space-between; transition:all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
                                       <div style="background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.4); border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 15px rgba(239,68,68,0.25);">
                                           <!-- High-quality Custom SVG for YouTube Play Button -->
                                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" fill="#ef4444"/></svg>
                                       </div>
                                       <div style="font-size:18px; font-weight:bold; color:#fff;">YouTube Real-time</div>
                                       <div style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-top:6px;">
                                           Đếm lượt xem công chiếu (Live View) của hàng triệu người xem đồng thời mà không làm sập hay quá tải cơ sở dữ liệu.
                                       </div>
                                   </div>
                               </div>
                               
                               <!-- CTA Banner -->
                               <div class="cta-banner-s5 glass-card" style="width:95%; border:1.5px solid rgba(6,182,212,0.35); background:rgba(6,182,212,0.06); border-radius:22px; padding:15px 25px; box-sizing:border-box; display:flex; justify-content:space-between; align-items:center; gap:20px; z-index:2; margin-top:35px; box-shadow: 0 5px 20px rgba(6,182,212,0.15);">
                                   <div style="text-align:left;">
                                       <div style="font-size:13px; font-weight:bold; color:#06b6d4; text-transform:uppercase; letter-spacing:0.5px;">Bạn muốn hiểu sâu hơn về HyperLogLog?</div>
                                   </div>
                                   <div style="display:flex; gap:12px;">
                                       <button style="background:rgba(236,72,153,0.15); border:1.5px solid #ec4899; color:#ec4899; font-size:11px; font-weight:bold; padding:8px 18px; border-radius:12px; display:flex; align-items:center; gap:6px; cursor:pointer;"><i data-lucide="heart" style="width:14px; height:14px; fill:#ec4899;"></i> Thả Tim</button>
                                       <button style="background:rgba(59,130,246,0.15); border:1.5px solid #3b82f6; color:#3b82f6; font-size:11px; font-weight:bold; padding:8px 18px; border-radius:12px; display:flex; align-items:center; gap:6px; cursor:pointer;"><i data-lucide="bell" style="width:14px; height:14px; fill:#3b82f6;"></i> Follow</button>
                                   </div>
                               </div>
                           </div>
                      `;
                  }"""

content = content.replace(old_template_8f, new_template_8f)
print("[+] Slide 8f template updated")

# -----------------------------------------------------------------------------
# 6. Update Slide 8d animation tick coordinates mapping
# -----------------------------------------------------------------------------
old_tick_8d = """            else if (slideId === 'slide_view_8d') {
                methodLabel = "MULTI_BUCKETS";
                
                const routerUserId = canvas.querySelector('.router-user-id');
                const routerBitsPrefix = canvas.querySelector('.router-bits-prefix');
                const routerBitsSuffix = canvas.querySelector('.router-bits-suffix');
                const routerTargetBucket = canvas.querySelector('.router-target-bucket');
                const routerTargetVal = canvas.querySelector('.router-target-val');
                const routePacket = canvas.querySelector('.route-packet-s3');
                const routePath = canvas.querySelector('.route-line-s3');
                
                const getBucketCoord = (idx) => {
                    const bucket = canvas.querySelector(`.r-s3-${idx}`);
                    const grid = canvas.querySelector('.registers-grid-s3');
                    if (bucket && grid) {
                        const rect = bucket.getBoundingClientRect();
                        const canvasRect = canvas.getBoundingClientRect();
                        return {
                            x: rect.left - canvasRect.left + rect.width / 2,
                            y: rect.top - canvasRect.top + rect.height / 2
                        };
                    }
                    return { x: 450, y: 300 };
                };
                
                if (routerUserId && routerBitsPrefix && routerBitsSuffix && routerTargetBucket && routerTargetVal && routePacket && routePath) {
                    const cycle = (progress * 3) % 1;
                    const step = Math.min(2, Math.floor(progress * 3));
                    
                    let userId = "user_3918";
                    let prefix = "0001";
                    let suffix = "110101...";
                    let bucketIdx = 1;
                    let maxVal = 2;
                    
                    if (step === 1) {
                        userId = "user_8421";
                        prefix = "0101";
                        suffix = "00001011...";
                        bucketIdx = 5;
                        maxVal = 4;
                    } else if (step === 2) {
                        userId = "user_6653";
                        prefix = "1001";
                        suffix = "00000110...";
                        bucketIdx = 9;
                        maxVal = 5;
                    }
                    
                    routerUserId.textContent = userId;
                    routerBitsPrefix.textContent = prefix;
                    routerBitsSuffix.textContent = suffix;
                    routerTargetBucket.textContent = `Vào Giỏ #${bucketIdx}`;
                    routerTargetVal.textContent = `Kỷ lục = ${maxVal}`;
                    
                    const startX = 450, startY = 135;
                    const targetCoord = getBucketCoord(bucketIdx);
                    
                    if (cycle < 0.85) {
                        const ratio = cycle / 0.85;
                        routePacket.style.opacity = 1;
                        
                        const ctrlX = (startX + targetCoord.x) / 2;
                        const ctrlY = startY + 40;
                        const t = ratio;
                        const x = (1-t)**2 * startX + 2*(1-t)*t * ctrlX + t**2 * targetCoord.x;
                        const y = (1-t)**2 * startY + 2*(1-t)*t * ctrlY + t**2 * targetCoord.y;
                        
                        routePacket.style.left = `${x}px`;
                        routePacket.style.top = `${y}px`;
                        
                        routePath.setAttribute('d', `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${targetCoord.x} ${targetCoord.y}`);
                        
                        const buckets = canvas.querySelectorAll('.reg-box-s3');
                        buckets.forEach(b => {
                            b.style.transform = 'scale(1)';
                            b.style.background = 'rgba(255,255,255,0.02)';
                            b.style.borderColor = 'rgba(255,255,255,0.05)';
                        });
                    } else {
                        routePacket.style.opacity = 0;
                        const bucket = canvas.querySelector(`.r-s3-${bucketIdx}`);
                        if (bucket) {
                            bucket.style.transform = 'scale(1.1)';
                            bucket.style.background = 'rgba(16,185,129,0.2)';
                            bucket.style.borderColor = '#10b981';
                            
                            const valEl = bucket.querySelector('.reg-val-s3');
                            if (valEl) {
                                valEl.textContent = maxVal.toString();
                                valEl.style.color = '#10b981';
                            }
                        }
                    }
                }
                
                codeOutput = "🗂️ Bước 3: HLL dùng các bit đầu của mã băm làm chỉ số giỏ (index) để chia đều luồng dữ liệu.\\n💡 Mỗi giỏ lưu giữ kỷ lục số 0 ở đầu riêng biệt. Gom từ hàng nghìn giỏ giúp loại bỏ nhiễu thống kê.";
            }"""

new_tick_8d = """            else if (slideId === 'slide_view_8d') {
                methodLabel = "MULTI_BUCKETS";
                
                const routerUserId = canvas.querySelector('.router-user-id');
                const routerBitsPrefix = canvas.querySelector('.router-bits-prefix');
                const routerBitsSuffix = canvas.querySelector('.router-bits-suffix');
                const routerTargetBucket = canvas.querySelector('.router-target-bucket');
                const routerTargetVal = canvas.querySelector('.router-target-val');
                const routePacket = canvas.querySelector('.route-packet-s3');
                const routePath = canvas.querySelector('.route-line-s3');
                const routerNode = canvas.querySelector('.router-node');
                const viewportRoot = canvas.querySelector('.view-viewport-root');
                
                const getBucketCoord = (idx) => {
                    const bucket = canvas.querySelector(`.r-s3-${idx}`);
                    const viewportRootEl = canvas.querySelector('.view-viewport-root');
                    if (bucket && viewportRootEl) {
                        const rect = bucket.getBoundingClientRect();
                        const viewRect = viewportRootEl.getBoundingClientRect();
                        return {
                            x: rect.left - viewRect.left + rect.width / 2,
                            y: rect.top - viewRect.top + rect.height / 2
                        };
                    }
                    return { x: 450, y: 300 };
                };
                
                if (routerUserId && routerBitsPrefix && routerBitsSuffix && routerTargetBucket && routerTargetVal && routePacket && routePath) {
                    const cycle = (progress * 3) % 1;
                    const step = Math.min(2, Math.floor(progress * 3));
                    
                    let userId = "user_3918";
                    let prefix = "0001";
                    let suffix = "110101...";
                    let bucketIdx = 1;
                    let maxVal = 2;
                    
                    if (step === 1) {
                        userId = "user_8421";
                        prefix = "0101";
                        suffix = "00001011...";
                        bucketIdx = 5;
                        maxVal = 4;
                    } else if (step === 2) {
                        userId = "user_6653";
                        prefix = "1001";
                        suffix = "00000110...";
                        bucketIdx = 9;
                        maxVal = 5;
                    }
                    
                    routerUserId.textContent = userId;
                    routerBitsPrefix.textContent = prefix;
                    routerBitsSuffix.textContent = suffix;
                    routerTargetBucket.textContent = `Vào Giỏ #${bucketIdx}`;
                    routerTargetVal.textContent = `Kỷ lục = ${maxVal}`;
                    
                    // Dynamically calculate start coords relative to viewportRoot to ensure the dot travels correctly
                    let startX = 450, startY = 85;
                    if (routerNode && viewportRoot) {
                        const rRect = routerNode.getBoundingClientRect();
                        const vRect = viewportRoot.getBoundingClientRect();
                        startX = rRect.left - vRect.left + rRect.width / 2;
                        startY = rRect.top - vRect.top + rRect.height / 2;
                    }
                    
                    const targetCoord = getBucketCoord(bucketIdx);
                    
                    if (cycle < 0.85) {
                        const ratio = cycle / 0.85;
                        routePacket.style.opacity = 1;
                        
                        const ctrlX = (startX + targetCoord.x) / 2;
                        const ctrlY = startY + 40;
                        const t = ratio;
                        const x = (1-t)**2 * startX + 2*(1-t)*t * ctrlX + t**2 * targetCoord.x;
                        const y = (1-t)**2 * startY + 2*(1-t)*t * ctrlY + t**2 * targetCoord.y;
                        
                        routePacket.style.left = `${x}px`;
                        routePacket.style.top = `${y}px`;
                        
                        routePath.setAttribute('d', `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${targetCoord.x} ${targetCoord.y}`);
                        
                        const buckets = canvas.querySelectorAll('.reg-box-s3');
                        buckets.forEach(b => {
                            b.style.transform = 'scale(1)';
                            b.style.background = 'rgba(255,255,255,0.02)';
                            b.style.borderColor = 'rgba(255,255,255,0.06)';
                        });
                    } else {
                        routePacket.style.opacity = 0;
                        const bucket = canvas.querySelector(`.r-s3-${bucketIdx}`);
                        if (bucket) {
                            bucket.style.transform = 'scale(1.15)';
                            bucket.style.background = 'rgba(16,185,129,0.2)';
                            bucket.style.borderColor = '#10b981';
                            
                            const valEl = bucket.querySelector('.reg-val-s3');
                            if (valEl) {
                                valEl.textContent = maxVal.toString();
                                valEl.style.color = '#10b981';
                            }
                        }
                    }
                }
                
                codeOutput = "🗂️ Bước 3: HLL dùng các bit đầu của mã băm làm chỉ số giỏ (index) để chia đều luồng dữ liệu.\\n💡 Mỗi giỏ lưu giữ kỷ lục số 0 ở đầu riêng biệt. Gom từ hàng nghìn giỏ giúp loại bỏ nhiễu thống kê.";
            }"""

content = content.replace(old_tick_8d, new_tick_8d)
print("[+] Slide 8d animation coordinates updated")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("[SUCCESS] All edits written to app.js")
