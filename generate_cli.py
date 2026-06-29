import argparse
import sys
import os

def main():
    parser = argparse.ArgumentParser(description="Standalone TTS generator CLI")
    parser.add_argument("--text", required=True, help="Text to synthesize")
    parser.add_argument("--output", required=True, help="Output path for the generated audio")
    parser.add_argument("--reference", help="Reference audio path for voice cloning")
    parser.add_argument("--voice", help="Voice preference for Edge-TTS fallback")
    args = parser.parse_args()

    # Import tts_handler inside the CLI process
    import tts_handler

    try:
        success = tts_handler.synthesize_audio(
            text=args.text,
            output_path=args.output,
            reference_audio_path=args.reference,
            voice_preference=args.voice
        )
        if success and os.path.exists(args.output):
            print("[+] CLI: Synthesis completed successfully.", file=sys.stderr)
            sys.exit(0)
        else:
            print("[-] CLI: Synthesis failed.", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(f"[-] CLI Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
