import { NextResponse, NextRequest } from 'next/server';

// POST request - Get settings from client and download setting as settings.txt file
export async function POST(req) {
  try {
    const response = await req.json();
    // set settings file
    const content = {
      W: 512,
      H: 512,
      tiling: false,
      restore_faces: false,
      seed: -1,
      sampler: 'Euler a',
      seed_resize_from_w: 0,
      seed_resize_from_h: 0,
      steps: 25,
      save_settings: true,
      save_sample_per_step: false,
      batch_name: 'Deforum_1',
      seed_behavior: 'iter',
      seed_iter_N: 1,
      use_init: false,
      strength_0_no_init: true,
      strength: 0.8,
      init_image: null,
      use_mask: false,
      use_alpha_as_mask: false,
      invert_mask: false,
      overlay_mask: true,
      mask_file: 'https://deforum.github.io/a1/M1.jpg',
      mask_contrast_adjust: 1.0,
      mask_brightness_adjust: 1.0,
      mask_overlay_blur: 4,
      fill: 1,
      full_res_mask: true,
      full_res_mask_padding: 4,
      reroll_blank_frames: 'reroll',
      reroll_patience: 10.0,
      precision: 'autocast',
      C: 4,
      f: 8,
      timestring: '20230731011244',
      prompts: {
        0: 'ENTER YOUR PROMPT :)',
      },
      positive_prompts: '',
      negative_prompts: '',
      animation_mode: '3D',
      max_frames: response.max_frames + 1,
      border: 'wrap',
      angle: '0:(0)',
      zoom: '0:(0)',
      translation_x: response.translation_x,
      translation_y: response.translation_y,
      translation_z: response.translation_z,
      transform_center_x: '0:(0)',
      transform_center_y: '0:(0)',
      rotation_3d_x: response.rotation_3d_x,
      rotation_3d_y: response.rotation_3d_y,
      rotation_3d_z: response.rotation_3d_z,
      enable_perspective_flip: false,
      enable_ddim_eta_scheduling: false,
      ddim_eta_schedule: '0:(0)',
      enable_ancestral_eta_scheduling: false,
      ancestral_eta_schedule: '0:(1)',
      perspective_flip_theta: '0:(0)',
      perspective_flip_phi: '0:(0)',
      perspective_flip_gamma: '0:(0)',
      perspective_flip_fv: '0:(53)',
      noise_schedule: '0: (0.065)',
      strength_schedule: response.strength_schedule,
      contrast_schedule: '0: (1.0)',
      cfg_scale_schedule: '0: (7)',
      pix2pix_img_cfg_scale_schedule: '0:(1.5)',
      enable_subseed_scheduling: false,
      subseed_schedule: '0:(1)',
      subseed_strength_schedule: '0:(0)',
      enable_steps_scheduling: false,
      steps_schedule: '0: (25)',
      fov_schedule: response.fov_schedule,
      aspect_ratio_schedule: '0: (1)',
      aspect_ratio_use_old_formula: false,
      near_schedule: response.near_schedule,
      far_schedule: response.far_schedule,
      seed_schedule: '0:(s), 1:(-1), "max_f-2":(-1), "max_f-1":(s)',
      enable_sampler_scheduling: false,
      sampler_schedule: '0: ("Euler a")',
      mask_schedule: '0: ("{video_mask}")',
      use_noise_mask: false,
      noise_mask_schedule: '0: ("{video_mask}")',
      enable_checkpoint_scheduling: false,
      checkpoint_schedule: '0: ("model1.ckpt"), 100: ("model2.safetensors")',
      enable_clipskip_scheduling: false,
      clipskip_schedule: '0: (2)',
      enable_noise_multiplier_scheduling: true,
      noise_multiplier_schedule: '0: (1.05)',
      kernel_schedule: '0: (5)',
      sigma_schedule: '0: (1.0)',
      amount_schedule: '0: (0.1)',
      threshold_schedule: '0: (0.0)',
      color_coherence: 'LAB',
      color_coherence_image_path: '',
      color_coherence_video_every_N_frames: 1.0,
      color_force_grayscale: false,
      diffusion_cadence: '2',
      optical_flow_cadence: 'None',
      cadence_flow_factor_schedule: '0: (1)',
      optical_flow_redo_generation: 'None',
      redo_flow_factor_schedule: '0: (1)',
      diffusion_redo: '0',
      noise_type: 'perlin',
      perlin_octaves: 4,
      perlin_persistence: 0.5,
      use_depth_warping: true,
      depth_algorithm: 'Midas-3-Hybrid',
      midas_weight: 0.2,
      padding_mode: 'border',
      sampling_mode: 'bicubic',
      save_depth_maps: false,
      video_init_path: 'https://deforum.github.io/a1/V1.mp4',
      extract_nth_frame: 1,
      extract_from_frame: 0,
      extract_to_frame: -1,
      overwrite_extracted_frames: false,
      use_mask_video: false,
      video_mask_path: 'https://deforum.github.io/a1/VM1.mp4',
      resume_from_timestring: false,
      resume_timestring: '20230129210106',
      hybrid_generate_inputframes: false,
      hybrid_generate_human_masks: 'None',
      hybrid_use_first_frame_as_init_image: true,
      hybrid_motion: 'None',
      hybrid_motion_use_prev_img: false,
      hybrid_flow_consistency: false,
      hybrid_consistency_blur: 2,
      hybrid_flow_method: 'RAFT',
      hybrid_composite: 'None',
      hybrid_use_init_image: false,
      hybrid_comp_mask_type: 'None',
      hybrid_comp_mask_inverse: false,
      hybrid_comp_mask_equalize: 'None',
      hybrid_comp_mask_auto_contrast: false,
      hybrid_comp_save_extra_frames: false,
      hybrid_comp_alpha_schedule: '0:(0.5)',
      hybrid_flow_factor_schedule: '0:(1)',
      hybrid_comp_mask_blend_alpha_schedule: '0:(0.5)',
      hybrid_comp_mask_contrast_schedule: '0:(1)',
      hybrid_comp_mask_auto_contrast_cutoff_high_schedule: '0:(100)',
      hybrid_comp_mask_auto_contrast_cutoff_low_schedule: '0:(0)',
      parseq_manifest: '',
      parseq_use_deltas: true,
      use_looper: false,
      init_images:
        '{\n    "0": "https://deforum.github.io/a1/Gi1.png",\n    "max_f/4-5": "https://deforum.github.io/a1/Gi2.png",\n    "max_f/2-10": "https://deforum.github.io/a1/Gi3.png",\n    "3*max_f/4-15": "https://deforum.github.io/a1/Gi4.jpg",\n    "max_f-20": "https://deforum.github.io/a1/Gi1.png"\n}',
      image_strength_schedule: '0:(0.75)',
      blendFactorMax: '0:(0.35)',
      blendFactorSlope: '0:(0.25)',
      tweening_frames_schedule: '0:(20)',
      color_correction_factor: '0:(0.075)',
      cn_1_overwrite_frames: true,
      cn_1_vid_path: '',
      cn_1_mask_vid_path: '',
      cn_1_enabled: false,
      cn_1_low_vram: false,
      cn_1_pixel_perfect: false,
      cn_1_module: 'none',
      cn_1_model: 'None',
      cn_1_weight: '0:(1)',
      cn_1_guidance_start: '0:(0.0)',
      cn_1_guidance_end: '0:(1.0)',
      cn_1_processor_res: 64,
      cn_1_threshold_a: 64,
      cn_1_threshold_b: 64,
      cn_1_resize_mode: 'Inner Fit (Scale to Fit)',
      cn_1_control_mode: 'Balanced',
      cn_1_loopback_mode: false,
      cn_2_overwrite_frames: true,
      cn_2_vid_path: '',
      cn_2_mask_vid_path: '',
      cn_2_enabled: false,
      cn_2_low_vram: false,
      cn_2_pixel_perfect: false,
      cn_2_module: 'none',
      cn_2_model: 'None',
      cn_2_weight: '0:(1)',
      cn_2_guidance_start: '0:(0.0)',
      cn_2_guidance_end: '0:(1.0)',
      cn_2_processor_res: 64,
      cn_2_threshold_a: 64,
      cn_2_threshold_b: 64,
      cn_2_resize_mode: 'Inner Fit (Scale to Fit)',
      cn_2_control_mode: 'Balanced',
      cn_2_loopback_mode: false,
      cn_3_overwrite_frames: true,
      cn_3_vid_path: '',
      cn_3_mask_vid_path: '',
      cn_3_enabled: false,
      cn_3_low_vram: false,
      cn_3_pixel_perfect: false,
      cn_3_module: 'none',
      cn_3_model: 'None',
      cn_3_weight: '0:(1)',
      cn_3_guidance_start: '0:(0.0)',
      cn_3_guidance_end: '0:(1.0)',
      cn_3_processor_res: 64,
      cn_3_threshold_a: 64,
      cn_3_threshold_b: 64,
      cn_3_resize_mode: 'Inner Fit (Scale to Fit)',
      cn_3_control_mode: 'Balanced',
      cn_3_loopback_mode: false,
      cn_4_overwrite_frames: true,
      cn_4_vid_path: '',
      cn_4_mask_vid_path: '',
      cn_4_enabled: false,
      cn_4_low_vram: false,
      cn_4_pixel_perfect: false,
      cn_4_module: 'none',
      cn_4_model: 'None',
      cn_4_weight: '0:(1)',
      cn_4_guidance_start: '0:(0.0)',
      cn_4_guidance_end: '0:(1.0)',
      cn_4_processor_res: 64,
      cn_4_threshold_a: 64,
      cn_4_threshold_b: 64,
      cn_4_resize_mode: 'Inner Fit (Scale to Fit)',
      cn_4_control_mode: 'Balanced',
      cn_4_loopback_mode: false,
      cn_5_overwrite_frames: true,
      cn_5_vid_path: '',
      cn_5_mask_vid_path: '',
      cn_5_enabled: false,
      cn_5_low_vram: false,
      cn_5_pixel_perfect: false,
      cn_5_module: 'none',
      cn_5_model: 'None',
      cn_5_weight: '0:(1)',
      cn_5_guidance_start: '0:(0.0)',
      cn_5_guidance_end: '0:(1.0)',
      cn_5_processor_res: 64,
      cn_5_threshold_a: 64,
      cn_5_threshold_b: 64,
      cn_5_resize_mode: 'Inner Fit (Scale to Fit)',
      cn_5_control_mode: 'Balanced',
      cn_5_loopback_mode: false,
      skip_video_creation: false,
      fps: response.fps,
      make_gif: false,
      delete_imgs: false,
      add_soundtrack: 'None',
      soundtrack_path: 'https://deforum.github.io/a1/A1.mp3',
      r_upscale_video: false,
      r_upscale_model: 'realesr-animevideov3',
      r_upscale_factor: 'x2',
      r_upscale_keep_imgs: true,
      store_frames_in_ram: false,
      frame_interpolation_engine: 'None',
      frame_interpolation_x_amount: 2,
      frame_interpolation_slow_mo_enabled: false,
      frame_interpolation_slow_mo_amount: 2,
      frame_interpolation_keep_imgs: true,
      sd_model_name: 'model.ckpt',
      sd_model_hash: '81761151',
      deforum_git_commit_id: '62c90a01',
    };
    // stringify it
    const contentString = JSON.stringify(content, null, 2);
    // set headers
    const headers = {
      'Content-Disposition': 'attachment; filename="settings.txt"',
      'Content-Type': 'text/plain',
    };
    // return
    return new Response(contentString, { headers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
